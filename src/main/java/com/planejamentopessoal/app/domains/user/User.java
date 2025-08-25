package com.planejamentopessoal.app.domains.user;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.planejamentopessoal.app.domains.user.dto.UserCreationDTO;
import jakarta.persistence.*;
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

    @ElementCollection
    @CollectionTable(name = "user_transaction_groups", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "transaction_group")
    private Set<String> transactionGroups = new HashSet<>();

    public User(UserCreationDTO userCreationDTO) {
        this.name = userCreationDTO.name();
        this.username = userCreationDTO.username();
        this.birthday = userCreationDTO.birthday();
        this.email = userCreationDTO.email();
        this.password = userCreationDTO.password();
        this.income = 0.0;
        this.balance = 0.0;
        this.invoiceClosingDate = 1;
    }
}
