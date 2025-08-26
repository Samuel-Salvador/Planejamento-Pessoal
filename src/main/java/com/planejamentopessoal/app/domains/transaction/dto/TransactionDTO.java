package com.planejamentopessoal.app.domains.transaction.dto;

import com.planejamentopessoal.app.domains.transaction.Transaction;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record TransactionDTO(

        Long id,
        String name,


        LocalDate date,

        Double price,

        Integer installments,

        String category,

        String type,


        String group,

        Integer currentInstallment,
        
        Long userId

) {

    public TransactionDTO(Transaction transaction){
        this(transaction.getId(), transaction.getName(),transaction.getDate(),transaction.getPrice(), transaction.getInstallments(), transaction.getCategory(), transaction.getType(), transaction.getGroup(), transaction.getCurrentInstallment(), transaction.getUserId());
    }
}
