package com.planejamentopessoal.app.domains.transaction;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.planejamentopessoal.app.domains.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.planejamentopessoal.app.domains.user.User;

@Service
public class TransactionService {
	
	@Autowired
	private TransactionRepository transactionRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public List<Transaction> findAll(){
		return transactionRepository.findAll();
	}
	public List<Transaction> findByMonth(Long user_id,Integer month, Integer year){
		User obj = userRepository.getReferenceById(user_id);
		LocalDate startDate,endDate;
		
		
		try{
			startDate = LocalDate.of(year, month, obj.getInvoiceClosingDate());
			endDate = LocalDate.of(year, month, obj.getInvoiceClosingDate()).plusMonths(1).minusDays(1);
			
		}catch(DateTimeException e) {
				
				startDate = LocalDate.of(year,month,LocalDate.of(year, month, 1).getMonth().minLength());
				endDate = LocalDate.of(year,month,LocalDate.of(year, month, 1).getMonth().minLength()).plusMonths(1).minusDays(1);
				
			}
		
		return transactionRepository.findByMonth(user_id,startDate,endDate);
	}
	
	public List<Transaction> findByCategory(Long id,Integer month, Integer year,String category){
		return transactionRepository.findByCategory(id,month,year,category);
	}
	
	public List<Transaction> insert(Transaction newTransaction) {
		
		List<Transaction> transactionList = new ArrayList<>();
		
		if(newTransaction.getInstallments()==1) {
			newTransaction.setCurrentInstallment(1);
			transactionList.add(newTransaction);
			transactionRepository.save(newTransaction);
		}else {
			for(int i = 1 ; i < newTransaction.getInstallments() ; i++) {
                Transaction installment = new Transaction(
                        null,
                        newTransaction.getName(),
                        newTransaction.getDate(),
                        newTransaction.getPrice() / newTransaction.getInstallments(),
                        newTransaction.getInstallments(),
                        newTransaction.getCategory(),
                        newTransaction.getType(),
                        newTransaction.getGroup(),
                        i,
                        newTransaction.getUser()
                );
                transactionList.add(installment);
                transactionRepository.save(installment);
			}
		}
		return transactionList;
	}
	
	public void delete(Long id) {
		transactionRepository.deleteById(id);
	}
	public List<Transaction> findByTransactionGroup(Long user_id, String transactionGroup) {
		return transactionRepository.findByGroup(user_id, transactionGroup);
	}
}
