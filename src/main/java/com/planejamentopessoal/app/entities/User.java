package com.planejamentopessoal.app.entities;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name="usuarios")
@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	private String name;
	private LocalDate birthday;
	private String email;
	private String microsoftData;
	
	private Double income;
	private Double balance;
	
	public User() {
		
	}
	
	
	public User(Long id,String name, LocalDate birthday, String email, String microsoftData, Double income, Double balance) {
		super();
		this.Id = id;
		this.name = name;
		this.birthday = birthday;
		this.email = email;
		this.microsoftData = microsoftData;
		this.income = income;
		this.balance = balance;
	}


	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public LocalDate getBirthday() {
		return birthday;
	}
	public void setBirthday(LocalDate birthday) {
		this.birthday = birthday;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMicrosoftData() {
		return microsoftData;
	}
	public void setMicrosoftData(String microsoftData) {
		this.microsoftData = microsoftData;
	}
	public Double getIncome() {
		return income;
	}
	public void setIncome(Double income) {
		this.income = income;
	}
	public Double getbalance() {
		return balance;
	}
	public void setbalance(Double balance) {
		this.balance = balance;
	}
	
	
	
}
