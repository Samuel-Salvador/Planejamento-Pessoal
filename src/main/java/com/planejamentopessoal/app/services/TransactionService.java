package com.planejamentopessoal.app.services;

import java.util.ArrayList;
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
	
	public List<Transaction> insert(Transaction obj) {
		List<Transaction> objList = new ArrayList<>();
		if(obj.getParcelas()==1) {
			obj.setParcelaAtual(1);
			objList.add(obj);
			repository.save(obj);
		}else {
			Transaction parcela = new Transaction
					(null,
					obj.getNome(),
					obj.getData(),
					obj.getPreco()/obj.getParcelas(),
					1,
					obj.getParcelas(),
					obj.getCategoria());
			objList.add(parcela);
			repository.save(parcela);
			
			for(int i =1;i<obj.getParcelas();i++) {
				parcela = new Transaction
						(null,
						obj.getNome(),
						obj.getData().minusDays(obj.getData().getDayOfMonth()-6).plusMonths(i),
						obj.getPreco()/obj.getParcelas(),
						i+1,
						obj.getParcelas(),
						obj.getCategoria());
				objList.add(parcela);
				repository.save(parcela);
			}
		}
		return objList;
	}
	
	public void delete(Long id) {
		repository.deleteById(id);
	}
}
