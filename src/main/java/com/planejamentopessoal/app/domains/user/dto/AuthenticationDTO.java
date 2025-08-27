package com.planejamentopessoal.app.domains.user.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthenticationDTO(@NotBlank String userName, @NotBlank String password) {
}
