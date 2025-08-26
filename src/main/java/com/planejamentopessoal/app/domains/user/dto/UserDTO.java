package com.planejamentopessoal.app.domains.user.dto;


import com.planejamentopessoal.app.domains.user.User;
import java.time.LocalDate;
import java.util.Set;

public record UserDTO(

        Long id,

        String name,

        String username,


        LocalDate birthday,

        String email,

        String password,

        Double income,
        Double balance,
        Integer invoiceClosingDate,
        Set<String> transactionGroups

) {
    public UserDTO(User user) {
        this(
                user.getId(),
                user.getName(),
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
