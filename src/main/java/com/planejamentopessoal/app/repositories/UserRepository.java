package com.planejamentopessoal.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.planejamentopessoal.app.entities.User;

public interface UserRepository extends JpaRepository<User,Long> {

}
