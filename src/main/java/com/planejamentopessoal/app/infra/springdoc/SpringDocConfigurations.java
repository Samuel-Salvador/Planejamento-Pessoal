package com.planejamentopessoal.app.infra.springdoc;



import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringDocConfigurations {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("bearer-key",
                                new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")))
                .info(new Info()
                        .title("Planejamento Pessoal - API")
                        .description("API REST de organização de despesas mensais e agrupamento por eventos (ex.: viagem, casamento, reformas). Projetada para praticar Spring Boot e seus módulos.")
                        .contact(new Contact()
                                .name("samuel20018@gmail.com")
                                .email("samuel20018@gmail.com")));
    }


}
