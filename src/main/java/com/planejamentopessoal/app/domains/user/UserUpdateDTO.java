package com.planejamentopessoal.app.domains.user;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record UserUpdateDTO(


        Double income,
        Double balance,

        @NotNull
        Integer invoiceClosingDate,
        @NotNull
        List<String> transactionGroups
) {
}
