package com.planejamentopessoal.app.domains.transaction;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.planejamentopessoal.app.domains.transaction.dto.TransactionCreationDTO;
import com.planejamentopessoal.app.domains.transaction.dto.TransactionDTO;
import com.planejamentopessoal.app.domains.user.UserRepository;
import jakarta.transaction.Transactional;
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
		User user = userRepository.getReferenceById(user_id);

        LocalDate startDate = LocalDate.of(year, month, user.getInvoiceClosingDate());
        LocalDate endDate = LocalDate.of(year, month, user.getInvoiceClosingDate()).plusMonths(1).minusDays(1);

		return transactionRepository.findByMonth(user_id, startDate, endDate);
	}

    public List<Transaction> findByTransactionGroup(Long user_id, String transactionGroup) {
        return transactionRepository.findByGroup(user_id, transactionGroup);
    }

    @Transactional
	public List<Transaction> insert(TransactionCreationDTO dto) {

		List<Transaction> transactionList = new ArrayList<>();


		if(dto.installments() == 1) {
            Transaction newTransaction = new Transaction(dto);
			newTransaction.setCurrentInstallment(1);
			transactionRepository.save(newTransaction);

            transactionList.add(newTransaction);
		}else {
            transactionList = Transaction.generateInstallments(dto);
            transactionRepository.saveAll(transactionList);
        }
		return transactionList;
    }

	@Transactional
	public void delete(Long id) {
		transactionRepository.deleteById(id);
	}

}
