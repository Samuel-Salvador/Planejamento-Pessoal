package com.planejamentopessoal.app.domains.transaction;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

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
@Table(name="transaction")
@Entity
public class Transaction implements Serializable{

	private static final long serialVersionUID = 1L;
	
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

	@ManyToOne
	@JoinColumn(name="id_usuario",nullable = false)
	private User user;

}
