package com.planejamentopessoal.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.planejamentopessoal.app.entities.Transaction;
import com.planejamentopessoal.app.repositories.TransactionRepository;

@Service
public class TransactionService {
	
	@Autowired
	private TransactionRepository repository;
	
	public List<Transaction> findAll() {
		return repository.findAll();
	}
	
	public Transaction findById(Long id) {
		Optional<Transaction> obj = repository.findById(id);
		
		return obj.get();
				
	}
	
	public Transaction insert(Transaction obj) {
		return repository.save(obj);
	}
	
	public void delete(Long id) {
		repository.deleteById(id);
	}
}
