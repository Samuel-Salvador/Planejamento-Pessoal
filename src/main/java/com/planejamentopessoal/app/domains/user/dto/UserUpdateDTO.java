package com.planejamentopessoal.app.domains.user.dto;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record UserUpdateDTO(


        Double income,
        Double balance,

        @NotNull
        Integer invoiceClosingDate,

        String transactionGroup
) {
}
