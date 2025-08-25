package com.planejamentopessoal.app.domains.transaction.dto;

import com.planejamentopessoal.app.domains.transaction.Transaction;
import com.planejamentopessoal.app.domains.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

public record TransactionDTO(
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
        this(transaction.getName(),transaction.getDate(),transaction.getPrice(), transaction.getInstallments(), transaction.getCategory(), transaction.getType(), transaction.getGroup(), transaction.getCurrentInstallment(), transaction.getUserId());
    }
}
