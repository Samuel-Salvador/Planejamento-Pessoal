package com.planejamentopessoal.app.domains.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {


    User findByUsername(String userName);
    boolean existsByUsername(String userName);
    boolean existsByEmail(String email);

}
