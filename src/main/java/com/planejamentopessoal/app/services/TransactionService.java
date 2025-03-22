package com.planejamentopessoal.app.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.planejamentopessoal.app.entities.Transaction;
import com.planejamentopessoal.app.repositories.TransactionRepository;

@Service
public class TransactionService {
	
	@Autowired
	private TransactionRepository repository;
	
	public List<Transaction> findAll(){
		return repository.findAll();
	}
	public List<Transaction> findByMonth(Long user_id,Integer month, Integer year){
		
		LocalDate startDate = LocalDate.of(year, month, 6);
		LocalDate endDate = LocalDate.of(year, month, 5).plusMonths(1);
		return repository.findByMonth(user_id,startDate,endDate);
	}
	
	public List<Transaction> findByCategory(Long id,Integer month, Integer year,String category){
		return repository.findByCategory(id,month,year,category);
	}
	
	public List<Transaction> insert(Transaction obj) {
		
		List<Transaction> objList = new ArrayList<>();
		
		if(obj.getInstallments()==1) {
			obj.setCurrentInstallment(1);
			objList.add(obj);
			repository.save(obj);
		}else {
			Transaction installment = new Transaction
					(null,
					obj.getName(),
					obj.getType(),
					obj.getDate(),
					obj.getPrice()/obj.getInstallments(),
					1,
					obj.getInstallments(),
					obj.getCategory(),
					obj.getUser(),
					obj.getGroup());
			objList.add(installment);
			repository.save(installment);
			
			for(int i =1;i<obj.getInstallments();i++) {
				installment = new Transaction
						(null,
						obj.getName(),
						obj.getType(),
						(obj.getDate().getDayOfMonth()<6)?
								obj.getDate().minusDays(obj.getDate().getDayOfMonth()-6).plusMonths(i-1):
								obj.getDate().minusDays(obj.getDate().getDayOfMonth()-6).plusMonths(i),
						obj.getPrice()/obj.getInstallments(),
						i+1,
						obj.getInstallments(),
						obj.getCategory(),
						obj.getUser(),
						obj.getGroup());
				objList.add(installment);
				repository.save(installment);
			}
		}
		return objList;
	}
	
	public void delete(Long id) {
		repository.deleteById(id);
	}
	public List<Transaction> findByTransactionGroup(Long user_id, String transactionGroup) {
		return repository.findByGroup(user_id, transactionGroup);
	}
}
