package com.planejamentopessoal.app.domains.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;


public record UserCreationDTO(

        @NotBlank
        String name,
        @NotBlank
        String username,
        @NotNull
        @Past
        LocalDate birthday,
        @Email
        String email,
        @NotBlank
        String password


) {}
