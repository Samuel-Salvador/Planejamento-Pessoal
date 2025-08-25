package com.planejamentopessoal.app.controllers;

import java.net.URI;
import java.util.List;

import com.planejamentopessoal.app.domains.user.*;
import com.planejamentopessoal.app.domains.user.dto.UserCreationDTO;
import com.planejamentopessoal.app.domains.user.dto.UserDTO;
import com.planejamentopessoal.app.domains.user.dto.UserUpdateDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping(value = "/users")
@CrossOrigin(origins = "https://planejamento-pessoal.vercel.app")
public class UserController {
	
	@Autowired
	private UserService userService;

	@GetMapping
	public ResponseEntity<List<UserDTO>> findAll(){
		List<UserDTO> userDTOList = userService.findAll();

		return ResponseEntity.ok().body(userDTOList);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<UserDTO> findById(@PathVariable Long id){
		UserDTO userDTO = userService.findById(id);

		return ResponseEntity.ok().body(userDTO);
	}
	
	@PostMapping
	public ResponseEntity<UserDTO> insert(@RequestBody @Valid UserCreationDTO userCreationDTO, UriComponentsBuilder uriBuilder){
		User newUser = userService.insert(userCreationDTO);
		
		URI uri = uriBuilder.path("/users/{id}").buildAndExpand(newUser.getId()).toUri();
			
		return ResponseEntity.created(uri).body(new UserDTO(newUser));
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id){
		userService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<UserDTO> update(@PathVariable Long id, @RequestBody @Valid UserUpdateDTO updateDTO){
		var user = userService.update(id,updateDTO);
		return ResponseEntity.ok().body(new UserDTO(user));
	}
	
	
}
