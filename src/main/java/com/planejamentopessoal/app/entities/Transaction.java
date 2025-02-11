package com.planejamentopessoal.app.entities;

import java.io.Serializable;

import java.time.LocalDate;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name="transaction")
@Entity
public class Transaction implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	private String nome;
	private LocalDate data;

	private Double preco;
	private Integer parcelas;
	private Integer parcelaAtual;
	private String categoria;
	
	private Integer mes;
	
	public Transaction() {		
	}

	public Transaction(Long id, String nome, LocalDate data,Integer mes, Double preco,Integer parcelaAtual, Integer parcelas, String categoria) {
		super();
		Id = id;
		this.nome = nome;
		this.data = data;
		this.mes = mes;
		this.preco = preco;
		this.parcelas = parcelas;
		this.parcelaAtual = parcelaAtual;
		this.categoria = categoria;
	}

	public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	

	public Integer getMes() {
		return mes;
	}

	public void setMes(Integer mes) {
		this.mes = mes;
	}

	public Double getPreco() {
		return preco;
	}

	public void setPreco(Double preco) {
		this.preco = preco;
	}

	
	public Integer getParcelaAtual() {
		return parcelaAtual;
	}

	public void setParcelaAtual(Integer parcelaAtual) {
		this.parcelaAtual = parcelaAtual;
	}

	public Integer getParcelas() {
		return parcelas;
	}

	public void setParcelas(Integer parcelas) {
		this.parcelas = parcelas;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
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
