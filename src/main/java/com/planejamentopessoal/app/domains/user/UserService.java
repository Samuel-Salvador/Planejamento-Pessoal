package com.planejamentopessoal.app.domains.user;

import java.util.List;
import java.util.Optional;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	private UserRepository repository;
	
	public List<UserDTO> findAll() {
		List<User> userList = repository.findAll();
        return userList.stream().map(UserDTO::new).toList();
	}

    @Transactional
	public User insert(UserCreationDTO userCreationDTO) {
		User newUser = new User(userCreationDTO);
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
		
		repositoryUser.setTransactionGroups(updateData.transactionGroups());
		repositoryUser.setInvoiceClosingDate(updateData.invoiceClosingDate());
		
		if(	updateData.balance() != null && updateData.income() != null) {
			repositoryUser.setBalance(updateData.balance());
			repositoryUser.setIncome(updateData.income());

		} else if(updateData.balance() != null) {
            repositoryUser.setBalance(updateData.balance());

        } else if(updateData.income() != null) {
            repositoryUser.setIncome(updateData.income());
        }

        return repositoryUser;
	}

    @Transactional
	public void delete(Long id) {
		repository.deleteById(id);
	}

}
