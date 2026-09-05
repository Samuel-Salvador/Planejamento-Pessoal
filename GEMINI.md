# 🧠 GEMINI.md - Planejamento Pessoal (Backend API)

Este documento fornece uma visão técnica e arquitetural detalhada da API REST do projeto **Planejamento Pessoal**, desenvolvida em **Java 21** e **Spring Boot 3**.

---

## 📌 Visão Geral do Projeto

A API REST do **Planejamento Pessoal** é o núcleo de regras de negócio e persistência para a gestão financeira do usuário. Ela provê autenticação via JWT, gerenciamento de perfil e saldo, cálculo de ciclos de faturas com base na data de fechamento customizada pelo usuário, geração automática de parcelas e categorização de despesas em grupos.

- **Repositório**: `Planejamento-Pessoal`
- **Hospedagem em Produção**: [Heroku](https://plan-pessoal-93978f82c0a7.herokuapp.com/)
- **Documentação Interativa Swagger**: `https://plan-pessoal-93978f82c0a7.herokuapp.com/swagger-ui.html`

---

## 🛠️ Stack Tecnológica & Dependências

| Tecnologia | Versão / Biblioteca | Finalidade |
|---|---|---|
| **Linguagem** | **Java 21** | Uso de recursos modernos como Records, Pattern Matching e Virtual Threads. |
| **Framework** | **Spring Boot 3.4.4** | Framework corporativo para microsserviços e APIs REST. |
| **Segurança** | **Spring Security 6** | Autenticação stateless, controle de acesso e codificação BCrypt. |
| **JWT** | **Auth0 java-jwt** | Criação, assinatura (HMAC256) e validação de tokens JWT. |
| **Persistência** | **Spring Data JPA / Hibernate** | Mapeamento Objeto-Relacional (ORM) e abstração de repositórios. |
| **Banco de Dados** | **PostgreSQL** | Banco de dados relacional (suporte local e nuvem via Heroku Postgres). |
| **Migrations** | **Flyway 10.13.0** | Versionamento e evolução automatizada do schema do banco. |
| **Produtividade** | **Lombok** | Redução de código boilerplate (`@Getter`, `@Setter`, `@AllArgsConstructor`, etc.). |
| **Validação** | **Jakarta Validation** | Validações declarativas via anotações (`@Valid`, `@NotBlank`, `@Email`). |
| **Documentação** | **SpringDoc OpenAPI** | Geração automática de documentação Swagger / OpenAPI 3. |

---

## 🏗️ Arquitetura e Padrões de Projeto

A aplicação segue uma arquitetura em camadas bem definida:

```text
com.planejamentopessoal.app/
├── controllers/          # Endpoints REST e controle de requisições/respostas HTTP
├── domains/
│   ├── transaction/      # Entidade Transaction, Repository, Service e DTOs
│   │   └── dto/          # TransactionCreationDTO, TransactionDTO
│   └── user/             # Entidade User, Repository, Services e DTOs
│       └── dto/          # AuthenticationDTO, UserCreationDTO, UserDTO, UserUpdateDTO
└── infra/
    ├── exceptions/       # Tratamento global de erros (@RestControllerAdvice)
    ├── security/         # Configurações de segurança, filtros e gerenciamento de JWT
    └── springdoc/        # Configuração do Swagger OpenAPI
```

### Principais Padrões Utilizados:
- **DTO Pattern (Data Transfer Object)**: Implementado utilizando **Java Records** para garantir imutabilidade e separação entre as entidades de banco e os dados trafegados nas requisições.
- **Stateless Authentication Filter**: Um `OncePerRequestFilter` (`SecurityFilter.java`) intercepta cada requisição HTTP, valida o token JWT enviado no cabeçalho `Authorization: Bearer <token>` e injeta o usuário autenticado no `SecurityContextHolder`.
- **Repository Pattern**: `UserRepository` e `TransactionRepository` estendem `JpaRepository`, utilizando consultas derivadas e JPQL quando necessário.

---

## 🔐 Segurança & CORS

### 1. Fluxo de Autenticação
- Endpoint: `POST /login`
- O usuário envia `{ "userName": "...", "password": "..." }`.
- O `AuthenticationManager` valida o hash BCrypt da senha.
- O `TokenService` gera um token JWT assinado com chave secreta (`api.security.token.secret`), com validade de 2 horas e contendo a claim customizada `"id"` (ID do usuário).

### 2. Configuração de CORS (`SecurityConfigurations.java`)
O método `corsConfigurationSource()` define os domínios autorizados a consumir a API:
- `https://planejamento-pessoal.vercel.app` (Front-end em produção na Vercel).
- Métodos permitidos: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`.
- `AllowCredentials: true`.

---

## 📊 Modelo de Dados & Migrações (Flyway)

As tabelas são gerenciadas por scripts de migração SQL em `src/main/resources/db/migration/`:

### 1. Tabela `users` (`V1__create_tables.sql`)
- `id` (BIGSERIAL PRIMARY KEY)
- `name` (VARCHAR(255))
- `username` (VARCHAR(100) UNIQUE)
- `birthday` (DATE)
- `email` (VARCHAR(255) UNIQUE)
- `password` (VARCHAR(255) - Hash BCrypt)
- `income` (DECIMAL(15,2) - Salário do usuário)
- `balance` (DECIMAL(15,2) - Saldo atual disponível)
- `invoice_closing_date` (INT - Dia de fechamento da fatura entre 1 e 28)

### 2. Tabela `user_transaction_groups` (`V1` e `V2`)
- Relacionamento `@ElementCollection` com a entidade `User`.
- Armazena a lista de grupos de gastos cadastrados pelo usuário (ex: "Dia a dia", "Viagem", "Reforma").

### 3. Tabela `transactions` (`V1` e `V3`)
- `id` (BIGSERIAL PRIMARY KEY)
- `name` (VARCHAR(255))
- `date` (DATE)
- `price` (DECIMAL(15,2))
- `installments` (INT - Quantidade total de parcelas)
- `current_installment` (INT - Número da parcela atual)
- `category` (VARCHAR(100))
- `type` (VARCHAR(50) - 'Crédito', 'Débito' ou 'Pix')
- `group_name` (VARCHAR(255))
- `user_id` (BIGINT FOREIGN KEY REFERENCES `users(id)`)

---

## 💡 Regras de Negócio Implementadas

1. **Geração Automática de Parcelas (`Transaction.generateInstallments`)**:
   - Ao cadastrar uma transação com `installments > 1`, o serviço gera automaticamente $N$ registros no banco de dados, incrementando o mês de vencimento de cada parcela sucessiva (`current_installment` de 1 até $N$).
2. **Ciclo de Fatura Mensal (`TransactionService.findByMonth`)**:
   - As despesas do mês são calculadas a partir do `invoiceClosingDate` do usuário.
   - Período: do dia `invoiceClosingDate` do mês solicitado até o dia anterior do mês subsequente.
3. **Gerenciamento Dinâmico de Grupos (`UserService.update`)**:
   - Para adicionar um grupo: envia o nome do grupo no campo `transactionGroup`.
   - Para remover um grupo: envia o prefixo `"-"` (ex: `"-Viagem"`) no campo `transactionGroup`.
4. **Grupo Padrão**:
   - Todo novo usuário é criado com o grupo `"Dia a dia"` por padrão.

---

## 📡 Referência dos Endpoints da API

### Autenticação
- `POST /login`: Autentica credenciais e retorna `{ "token": "..." }`.

### Usuários (`/users`)
- `POST /users`: Cria novo usuário (Aberto/Público).
- `GET /users`: Lista todos os usuários (Protegido).
- `GET /users/{id}`: Retorna perfil detalhado do usuário (Protegido).
- `PUT /users/{id}`: Atualiza salário, saldo, dia de fatura ou grupos (Protegido).
- `DELETE /users/{id}`: Exclui a conta e dados associados (Protegido).

### Transações (`/transactions`)
- `GET /transactions`: Lista todas as transações (Protegido).
- `GET /transactions/{userId}/{month}/{year}`: Lista transações do ciclo da fatura do mês/ano (Protegido).
- `GET /transactions/{userId}/{group}`: Lista transações filtradas por grupo específico (Protegido).
- `POST /transactions`: Cria uma nova transação (e parcelas se aplicável) (Protegido).
- `DELETE /transactions/{id}`: Remove a transação pelo ID (Protegido).

### Documentação
- `GET /swagger-ui.html`: Interface visual do Swagger para testar endpoints.
- `GET /v3/api-docs`: Especificação OpenAPI em formato JSON.

---

## ⚙️ Configuração de Ambientes

- **Perfil de Produção (`application-prod.properties`)**:
  - Ativado por `spring.profiles.active=prod` em `application.properties`.
  - Conexão configurada via variável de ambiente `${DATABASE_URL}`.
  - Secret do JWT configurado via `${JWT_SECRET}`.
- **Perfil de Desenvolvimento (`application-dev.properties`)**:
  - Conexão local em `jdbc:postgresql://localhost:5432/planejamento-pessoal`.
  - Usuário e senha via `${POSTGRES_USERNAME}` e `${POSTGRES_PASSWORD}`.

---

## 🚀 Como Executar o Backend Localmente

### Pré-requisitos
- **Java 21** instalado (`java -version`).
- **PostgreSQL** rodando localmente na porta `5432` com a base `planejamento-pessoal` criada.

### Comandos de Execução:
```powershell
# Windows PowerShell (usando o Maven Wrapper embutido)
.\mvnw.cmd spring-boot:run

# Ou definir o profile de desenvolvimento explicitamente
.\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
```
A API iniciará por padrão na porta **3030** (`http://localhost:3030`).
