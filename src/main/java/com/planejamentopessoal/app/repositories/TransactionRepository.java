package com.planejamentopessoal.app.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.planejamentopessoal.app.entities.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction,Long>{

	@Query(value = "SELECT * FROM transaction WHERE id_usuario=? AND date BETWEEN ? AND ?", nativeQuery = true)
	List<Transaction> findByMonth(Long user_id,LocalDate startDate,LocalDate endDate);
	
	@Query(value = "SELECT * FROM transaction WHERE id_usuario=? AND mes=? AND ano=? AND categoria=?", nativeQuery = true)
	List<Transaction> findByCategory(Long user_id,Integer month,Integer year,String category);

	@Query(value = "SELECT * FROM transaction WHERE id_usuario=? AND group_name=?", nativeQuery = true)
	List<Transaction> findByGroup(Long user_id, String transactionGroup);
}
