package com.planejamentopessoal.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.planejamentopessoal.app.entities.User;
import com.planejamentopessoal.app.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository repository;
	
	public List<User> findAll() {
		return repository.findAll();
	}
	
	public User findById(Long id) {
		Optional<User> obj = repository.findById(id);
		
		return obj.get();			
	}
	
	public User insert(User obj) {
		obj.getTransactionGroups().add("Dia a dia");
		return repository.save(obj);
	}
	
	public User update(Long id, User obj) {
		User entity = repository.getReferenceById(id);
		updateData(entity,obj);
		return repository.save(entity);
	}
	
	public void delete(Long id) {
		repository.deleteById(id);
	}

	private void updateData(User entity, User obj) {
			
			entity.setTransactionGroups(obj.getTransactionGroups());
			
			if(obj.getBalance()==null) {
				entity.setIncome(obj.getIncome());
			}else if(obj.getIncome()==null) {
				entity.setBalance(obj.getBalance());
			} else {
				entity.setBalance(obj.getBalance());
				entity.setIncome(obj.getIncome());
			}	
	}
}
