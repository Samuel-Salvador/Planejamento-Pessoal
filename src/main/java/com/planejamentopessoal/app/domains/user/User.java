package com.planejamentopessoal.app.domains.user;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.planejamentopessoal.app.domains.transaction.Transaction;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;

@Table(name="users")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String username;
	private LocalDate birthday;
	private String email;
	private String password;
	
	private Double income;
	private Double balance;
	private Integer invoiceClosingDate;
	
	private List<String> transactionGroups = new ArrayList<>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
	private List<Transaction> transactionList = new ArrayList<>();


    public User(UserCreationDTO userCreationDTO) {
        this.name = userCreationDTO.name();
        this.username = userCreationDTO.username();
        this.birthday = userCreationDTO.birthday();
        this.email = userCreationDTO.email();
        this.password = userCreationDTO.password();
        this.income = 0.0;
        this.balance = 0.0;
        this.invoiceClosingDate = 1;
        this.transactionGroups.add("Dia a dia");
    }
}
