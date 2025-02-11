package com.planejamentopessoal.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.planejamentopessoal.app.entities.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction,Long>{

	@Query(value = "SELECT * FROM transaction WHERE mes=?", nativeQuery = true)
	List<Transaction> findByMonth(Integer month);
}
