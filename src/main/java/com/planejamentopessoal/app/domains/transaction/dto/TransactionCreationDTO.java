package com.planejamentopessoal.app.domains.transaction.dto;

import com.planejamentopessoal.app.domains.transaction.Transaction;

import java.time.LocalDate;

public record TransactionCreationDTO(
        String name,

        LocalDate date,
        Double price,
        Integer installments,
        String category,
        String type,


        String group,

        Long userId

) {

    public TransactionCreationDTO(Transaction transaction){
        this(transaction.getName(),transaction.getDate(),transaction.getPrice(), transaction.getInstallments(), transaction.getCategory(), transaction.getType(), transaction.getGroup(), transaction.getUserId());
    }
}
