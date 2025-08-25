package com.planejamentopessoal.app.domains.transaction;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.planejamentopessoal.app.domains.transaction.dto.TransactionCreationDTO;
import com.planejamentopessoal.app.domains.transaction.dto.TransactionDTO;
import com.planejamentopessoal.app.domains.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@Table(name="transactions")
@Entity
public class Transaction{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	
	private LocalDate date;
	private Double price;
	private Integer installments;
	private String category;
	private String type;

	@Column(name="group_name")
	private String group;
	
	private Integer currentInstallment;

    private Long userId;

    public Transaction(TransactionCreationDTO transactionDTO){
        this.name = transactionDTO.name();
        this.date = transactionDTO.date();
        this.price = transactionDTO.price();
        this.installments = transactionDTO.installments();
        this.category = transactionDTO.category();
        this.type = transactionDTO.type();
        this.group = transactionDTO.group();
        this.userId = transactionDTO.userId();
    }

    public static List<Transaction> generateInstallments(TransactionCreationDTO transactionDTO){
        List<Transaction> transactionList = new ArrayList<>();

        for(int i = 1 ; i <= transactionDTO.installments() ; i++) {
            Transaction installment = new Transaction(
                    null,
                    transactionDTO.name(),
                    transactionDTO.date(),
                    transactionDTO.price() / transactionDTO.installments(),
                    transactionDTO.installments(),
                    transactionDTO.category(),
                    transactionDTO.type(),
                    transactionDTO.group(),
                    i,
                    transactionDTO.userId()
            );
            transactionList.add(installment);

        }
        return transactionList;
    }

}
