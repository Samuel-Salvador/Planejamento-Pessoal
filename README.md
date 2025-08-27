# Planejamento Pessoal

<img src="https://img.shields.io/badge/Java-17-blue?logo=java" alt="Java"></img> <img src="https://img.shields.io/badge/Spring%20Boot-3.2.x-brightgreen?logo=springboot" alt="Spring Boot"></img> <img src="https://img.shields.io/badge/Hibernate-ORM-orange" alt="Hibernate"></img> <img src="https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql" alt="PostgreSQL"></img> <img src="https://img.shields.io/badge/Maven-Build-red?logo=apachemaven" alt="Maven"></img> <img src="https://img.shields.io/badge/Heroku-Deploy-79589F?logo=heroku" alt="Heroku"></img>

API REST de organização de despesas mensais e agrupamento por eventos (ex.: viagem, casamento, reformas). Projetada para praticar Spring Boot e seus módulos. Hospedada no Heroku. <hr></hr>

### 🚀 Tecnologias
 - Java
 - Maven
 - Spring Boot
 - Spring Data JPA / Hibernate
 - Spring Security
 - Bean Validation
 - 0Auth (Autenticação por token JWT)
 - PostgreSQL
 - Flyway
 - Lombok
 - Swagger (OpenAPI)

### ✨ Funcionalidades
 - CRUD de despesas
 - Agrupamento de despesas por grupo/projeto
 - Categorização básica
 - Cálculo de total mensal e por grupo
 - Deploy contínuo (Heroku)
 - Documentação interativa (Swagger)

### 📁 Estrutura geral
 - Camadas: Controller ➡ Service ➡ Repository
 - Entidades: Usuário, Despesa.
 - Boas práticas seguidas:
   - DTOs para entrada/saída.
   - Validação usando Bean Validation.
   - Regras de Negócios isolada na camada Service.
   - Tratamento global de erros (@RestControllerAdvice)
   - Script de migração de banco de dados.

### 🛠️ Como rodar localmente
Pré-requisitos:
 - Java 17+
 - Maven 3.8+
 - PostgreSQL 13+
 - Git

1. Clonar o repositório e entrar na pasta:
    ```
    git clone https://github.com/samuel-salvador/planejamento-pessoal.git
    cd planejamento-pessoal
    ```

2. Criar o banco de dados:
   1. Abra o SQL Shell(psql)
   2. Ele vai pedir:
      1. Server (pode deixar vazio para localhost)
      2. Database (pode deixar vazio para postgres)
      3. Port (pode deixar vazio para 5432)
      4. Username (geralmente postgres)
      5. Password (a senha que você definiu na instalação)
   3. Depois é só criar o banco:
       ```
       CREATE DATABASE planejamento_pessoal;
       ```
3. Configurar o arquivo src/main/resources/application.properties:
    ```
    spring.datasource.url=jdbc:postgresql://localhost:5432/planejamento_pessoal
    spring.datasource.username=SEU_USUARIO
    spring.datasource.password=SUA_SENHA
    server.port=3030
    ```
4. Agora é só executar o comando do maven, lembre-se de tê-lo adicionado as variáveis de ambiente:
    ```
   mvn spring-boot:run
   ```
<hr></hr>

Para visualização e interação com a API por meio do Swagger: https://plan-pessoal-93978f82c0a7.herokuapp.com/swagger-ui.html