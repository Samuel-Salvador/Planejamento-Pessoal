package com.planejamentopessoal.app.domains.user;

import java.time.LocalDate;


public record UserCreationDTO(

        String name,
        String username,
        LocalDate birthday,
        String email,
        String password


) {}
