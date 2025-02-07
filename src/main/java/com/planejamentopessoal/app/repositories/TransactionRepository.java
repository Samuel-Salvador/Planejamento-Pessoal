package com.planejamentopessoal.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.planejamentopessoal.app.entities.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction,Long>{
}
