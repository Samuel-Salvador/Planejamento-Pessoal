package com.planejamentopessoal.app.domains.transaction;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TransactionRepository extends JpaRepository<Transaction,Long>{

	@Query(value = "SELECT * FROM transaction WHERE id_usuario=?1 AND date >= ?2 AND date <= ?3", nativeQuery = true)
	List<Transaction> findByMonth(Long user_id,LocalDate startDate,LocalDate endDate);
	
	@Query(value = "SELECT * FROM transaction WHERE id_usuario=?1 AND mes=?2 AND ano=?3 AND categoria=?4", nativeQuery = true)
	List<Transaction> findByCategory(Long user_id,Integer month,Integer year,String category);

	@Query(value = "SELECT * FROM transaction WHERE id_usuario=?1 AND group_name=?2", nativeQuery = true)
	List<Transaction> findByGroup(Long user_id, String transactionGroup);
}
