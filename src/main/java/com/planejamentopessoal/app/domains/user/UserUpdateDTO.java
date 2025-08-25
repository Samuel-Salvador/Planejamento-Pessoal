package com.planejamentopessoal.app.domains.user;

import java.util.List;

public record UserUpdateDTO(
        Double income,
        Double balance,
        Integer invoiceClosingDate,
        List<String> transactionGroups
) {
}
