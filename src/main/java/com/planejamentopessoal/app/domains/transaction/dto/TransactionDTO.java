package com.planejamentopessoal.app.domains.transaction.dto;

import com.planejamentopessoal.app.domains.transaction.Transaction;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record TransactionDTO(

        @NotBlank
        String name,

        @NotNull
        LocalDate date,
        @NotNull
        Double price,
        @NotNull
        Integer installments,
        @NotBlank
        String category,
        @NotBlank
        String type,

        @NotBlank
        String group,
        @NotNull
        Integer currentInstallment,
        @NotNull
        Long userId

) {

    public TransactionDTO(Transaction transaction){
        this(transaction.getName(),transaction.getDate(),transaction.getPrice(), transaction.getInstallments(), transaction.getCategory(), transaction.getType(), transaction.getGroup(), transaction.getCurrentInstallment(), transaction.getUserId());
    }
}
