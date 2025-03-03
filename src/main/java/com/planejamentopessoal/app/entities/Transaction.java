package com.planejamentopessoal.app.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Table(name="transaction")
@Entity
public class Transaction implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	private String name;
	
	private LocalDate date;
	private Double price;
	private Integer installments;
	private String category;
	private String type;
	
	private Integer currentInstallment;

	@ManyToOne
	@JoinColumn(name="id_usuario",nullable = false)
	private User user;
	
	public Transaction() {		
	}

	public Transaction(Long id, String name,String type, LocalDate date, Double price,Integer currentInstallment, Integer installments, String category,User user) {
		super();
		Id = id;
		this.name = name;
		this.date = date;
		this.price = price;
		this.currentInstallment = currentInstallment;
		this.installments = installments;
		this.category = category;
		this.type = type;
		this.user = user;
	}

	public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	
	public Integer getCurrentInstallment() {
		return currentInstallment;
	}

	public void setCurrentInstallment(Integer currentInstallment) {
		this.currentInstallment = currentInstallment;
	}

	public Integer getInstallments() {
		return installments;
	}

	public void setInstallments(Integer installments) {
		this.installments = installments;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public int hashCode() {
		return Objects.hash(Id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Transaction other = (Transaction) obj;
		return Objects.equals(Id, other.Id);
	}

	
	
	
	
}
