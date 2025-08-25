package com.planejamentopessoal.app.domains.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.planejamentopessoal.app.domains.transaction.Transaction;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public record UserDTO(

        @NotBlank
        String name,
        @NotBlank
        String username,
        @Past
        @NotNull
        LocalDate birthday,
        @Email
        String email,
        @NotBlank
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
