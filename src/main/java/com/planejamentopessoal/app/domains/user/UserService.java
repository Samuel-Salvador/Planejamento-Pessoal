package com.planejamentopessoal.app.domains.user;

import java.util.List;

import com.planejamentopessoal.app.domains.user.dto.UserCreationDTO;
import com.planejamentopessoal.app.domains.user.dto.UserDTO;
import com.planejamentopessoal.app.domains.user.dto.UserUpdateDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.MethodArgumentNotValidException;

@Service
public class UserService {

	@Autowired
	private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;
	
	public List<UserDTO> findAll() {
		List<User> userList = repository.findAll();
        return userList.stream().map(UserDTO::new).toList();
	}

    @Transactional
	public User insert(UserCreationDTO userCreationDTO) {
		User newUser = new User(userCreationDTO);
        if (repository.existsByEmail(userCreationDTO.email()) || repository.existsByUsername(userCreationDTO.username())){
            throw new IllegalArgumentException("Email ou nome de usuário existente!");
        }
        newUser.getTransactionGroups().add("Dia a dia");
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        repository.save(newUser);
		return newUser;
	}

    public UserDTO findById(Long id) {
        User user = repository.getReferenceById(id);

        return new UserDTO(user);
    }

    @Transactional
	public User update(Long id, UserUpdateDTO updateData) {
		User repositoryUser = repository.getReferenceById(id);
		repositoryUser.setInvoiceClosingDate(updateData.invoiceClosingDate());
		
		if(updateData.income() != null) {
			repositoryUser.setIncome(updateData.income());
		}
        if(updateData.balance() != null) {
            repositoryUser.setBalance(updateData.balance());
        }
        if (updateData.transactionGroup() != null){
            if(updateData.transactionGroup().startsWith("-")){
                var tgToBeRemoved = updateData.transactionGroup().replace("-","");
                repositoryUser.getTransactionGroups().remove(tgToBeRemoved);

            }else repositoryUser.getTransactionGroups().add(updateData.transactionGroup());
        }

        return repositoryUser;
	}

    @Transactional
	public void delete(Long id) {
		repository.deleteById(id);
	}

}
