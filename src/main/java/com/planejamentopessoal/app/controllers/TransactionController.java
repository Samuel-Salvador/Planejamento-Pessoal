package com.planejamentopessoal.app.controllers;

import java.net.URI;
import java.util.List;

import com.planejamentopessoal.app.domains.transaction.dto.TransactionCreationDTO;
import com.planejamentopessoal.app.domains.transaction.dto.TransactionDTO;
import com.planejamentopessoal.app.domains.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.planejamentopessoal.app.domains.transaction.Transaction;
import com.planejamentopessoal.app.domains.transaction.TransactionService;

@RestController
@RequestMapping(value = "/transactions")
@CrossOrigin(origins = "https://planejamento-pessoal.vercel.app")
public class TransactionController {
	
	@Autowired
	private TransactionService transactionService;

    @Autowired
    private UserService userService;
	
	@GetMapping
	public ResponseEntity<List<TransactionDTO>> findAll(){
		List<Transaction> transactionList = transactionService.findAll();
        List<TransactionDTO> dtoList = transactionList.stream().map(TransactionDTO::new).toList();
		return ResponseEntity.ok().body(dtoList);
	}

	@GetMapping(value = "/{user_id}/{month}/{year}")
	public ResponseEntity<List<Transaction>> findByMonth(@PathVariable Long user_id,@PathVariable Integer month,@PathVariable Integer year){
		List<Transaction> list = transactionService.findByMonth(user_id,month,year);
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{user_id}/{month}/{year}/{category}")
	public ResponseEntity<List<Transaction>> findByCategory(@PathVariable Long user_id,@PathVariable Integer month,@PathVariable Integer year,@PathVariable String category){
		List<Transaction> list = transactionService.findByCategory(user_id,month,year,category);
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{user_id}/{transactionGroup}")
	public ResponseEntity<List<Transaction>> findByTrnsactionGroup(@PathVariable Long user_id, @PathVariable String transactionGroup){
		List<Transaction> list = transactionService.findByTransactionGroup(user_id,transactionGroup);
		return ResponseEntity.ok().body(list);
	}
	
	@PostMapping
	public ResponseEntity<List<TransactionDTO>> insert(@RequestBody TransactionCreationDTO transactionDTO){
		List<TransactionDTO> transactionList = transactionService.insert(transactionDTO);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
		return ResponseEntity.created(uri).body(transactionList);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id){
		transactionService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
