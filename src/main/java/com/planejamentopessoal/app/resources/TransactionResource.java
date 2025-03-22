package com.planejamentopessoal.app.resources;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.planejamentopessoal.app.entities.Transaction;
import com.planejamentopessoal.app.services.TransactionService;

@RestController
@RequestMapping(value = "/transactions")
public class TransactionResource {
	
	@Autowired
	private TransactionService service;
	
	@GetMapping
	public ResponseEntity<List<Transaction>> findAll(){
		List<Transaction> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	@GetMapping(value = "/{user_id}/{month}/{year}")
	public ResponseEntity<List<Transaction>> findByMonth(@PathVariable Long user_id,@PathVariable Integer month,@PathVariable Integer year){
		List<Transaction> list = service.findByMonth(user_id,month,year);
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{user_id}/{month}/{year}/{category}")
	public ResponseEntity<List<Transaction>> findByCategory(@PathVariable Long user_id,@PathVariable Integer month,@PathVariable Integer year,@PathVariable String category){
		List<Transaction> list = service.findByCategory(user_id,month,year,category);
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{user_id}/{transactionGroup}")
	public ResponseEntity<List<Transaction>> findByTrnsactionGroup(@PathVariable Long user_id, @PathVariable String transactionGroup){
		List<Transaction> list = service.findByTransactionGroup(user_id,transactionGroup);
		return ResponseEntity.ok().body(list);
	}
	
	@PostMapping
	public List<ResponseEntity<Transaction>> insert(@RequestBody Transaction obj){
		List<Transaction> objList = service.insert(obj);
		List<ResponseEntity<Transaction>> responseList = new ArrayList<>();
		for(Transaction transaction: objList) {
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
					.path("/{id}").buildAndExpand(transaction.getId()).toUri();
			
			responseList.add(ResponseEntity.created(uri).body(obj));
		}
		return responseList;		
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
