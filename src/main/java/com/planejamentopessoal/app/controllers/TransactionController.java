package com.planejamentopessoal.app.controllers;

import java.net.URI;
import java.util.List;

import com.planejamentopessoal.app.domains.transaction.dto.TransactionCreationDTO;
import com.planejamentopessoal.app.domains.transaction.dto.TransactionDTO;
import com.planejamentopessoal.app.domains.user.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.planejamentopessoal.app.domains.transaction.Transaction;
import com.planejamentopessoal.app.domains.transaction.TransactionService;

@RestController
@RequestMapping(value = "/transactions")
public class TransactionController {
	
	@Autowired
	private TransactionService transactionService;

    @Autowired
    private UserService userService;
	
	@GetMapping
	public ResponseEntity<List<TransactionDTO>> findAll(){
        List<TransactionDTO> dtoList = transactionService.findAll().stream().map(TransactionDTO::new).toList();
		return ResponseEntity.ok().body(dtoList);
	}

	@GetMapping(value = "/{user_id}/{month}/{year}")
	public ResponseEntity<List<TransactionDTO>> findByMonth(@PathVariable Long user_id,@PathVariable Integer month,@PathVariable Integer year){
		List<TransactionDTO> dtoList = transactionService.findByMonth(user_id,month,year).stream().map(TransactionDTO::new).toList();
		return ResponseEntity.ok().body(dtoList);
	}
	
	@GetMapping(value = "/{user_id}/{transactionGroup}")
	public ResponseEntity<List<TransactionDTO>> findByTransactionGroup(@PathVariable Long user_id, @PathVariable String transactionGroup){
		List<TransactionDTO> dtoList = transactionService.findByTransactionGroup(user_id,transactionGroup).stream().map(TransactionDTO::new).toList();
		return ResponseEntity.ok().body(dtoList);
	}
	
	@PostMapping
	public ResponseEntity<List<TransactionDTO>> insert(@RequestBody @Valid TransactionCreationDTO transactionDTO){
		List<TransactionDTO> dtoList = transactionService.insert(transactionDTO).stream().map(TransactionDTO::new).toList();
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
		return ResponseEntity.created(uri).body(dtoList);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id){
		transactionService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
