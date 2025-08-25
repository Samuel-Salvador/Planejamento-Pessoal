package com.planejamentopessoal.app.domains.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.planejamentopessoal.app.domains.transaction.Transaction;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public record UserDTO(

        String name,
        String username,
        LocalDate birthday,
        String email,
        String password,
        Double income,
        Double balance,
        Integer invoiceClosingDate,
        List<String> transactionGroups,
        List<Transaction> transactionList

) {
    public UserDTO(User user) {
        this(user.getName(),
                user.getUsername(),
                user.getBirthday(),
                user.getEmail(),
                user.getPassword(),
                user.getIncome(),
                user.getBalance(),
                user.getInvoiceClosingDate(),
                user.getTransactionGroups(),
                user.getTransactionList()
        );
    }
}
