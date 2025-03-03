package com.planejamentopessoal.app.config;

import java.time.LocalDate;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.planejamentopessoal.app.entities.Transaction;
import com.planejamentopessoal.app.entities.User;
import com.planejamentopessoal.app.repositories.TransactionRepository;
import com.planejamentopessoal.app.repositories.UserRepository;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner{
	
	@Autowired
	private TransactionRepository transactionRepository;

	@Autowired
	private UserRepository userRepository;
	@Override
	public void run(String... args) throws Exception {
		User samuel = new User(null,"Samuel","Samzin",LocalDate.of(2001, 6, 29),"samuel20018@gmail.com","sss290601");
		User gabi = new User(null,"Gabriela","Gabi",LocalDate.of(2001, 6, 29),"samuel20018@gmail.com","sss290601");
		
		Transaction t1 = new Transaction(null, "Gasolina","Crédito",LocalDate.now(), 14.5,1, 2, "Posto",samuel);
		Transaction t2 = new Transaction(null, "Etanol","Crédito",LocalDate.now() , 25.0,1, 1, "Posto",samuel);
		Transaction t3 = new Transaction(null, "Etanois","Crédito",LocalDate.now() , 25.0,1, 1, "Posto",samuel);
		Transaction t4 = new Transaction(null, "Perdigão","Crédito",LocalDate.of(2025, 3, 27) , 25.0,1, 1, "Posto",samuel);
		
		Transaction t5 = new Transaction(null, "aaa","Crédito",LocalDate.now(), 14.5,1, 2, "Posto",gabi);
		Transaction t6= new Transaction(null, "bbbl","Crédito",LocalDate.now() , 25.0,1, 1, "Posto",gabi);
		Transaction t7 = new Transaction(null, "ccc","Crédito",LocalDate.now() , 25.0,1, 1, "Posto",gabi);
		
		
		userRepository.save(samuel);
		userRepository.save(gabi);
		transactionRepository.saveAll(Arrays.asList(t1,t2,t3,t4,t5,t6,t7));
	}
	
}
