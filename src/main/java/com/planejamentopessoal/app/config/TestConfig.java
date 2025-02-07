package com.planejamentopessoal.app.config;

import java.time.LocalDate;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.planejamentopessoal.app.entities.Transaction;
import com.planejamentopessoal.app.repositories.TransactionRepository;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner{
	
	@Autowired
	private TransactionRepository transactionRepository;

	@Override
	public void run(String... args) throws Exception {
		
		Transaction t1 = new Transaction(null, "Gasolina",LocalDate.now() , 14.5, 2, "Posto");
		Transaction t2 = new Transaction(null, "Etanol",LocalDate.now() , 25.0, 1, "Posto");
		Transaction t3 = new Transaction(null, "Etanois",LocalDate.now() , 25.0, 1, "Posto");

		transactionRepository.saveAll(Arrays.asList(t1,t2,t3));
		
	}
	
}
