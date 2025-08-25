package com.planejamentopessoal.app.domains.user.dto;

import com.planejamentopessoal.app.domains.transaction.Transaction;
import com.planejamentopessoal.app.domains.user.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

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
        Set<String> transactionGroups

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
                user.getTransactionGroups()
        );
    }
}
