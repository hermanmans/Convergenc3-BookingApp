package com.herman.Springboottutorial.repository;

import com.herman.Springboottutorial.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    User findByPasswordAndUserEmail(String password, String email);
}
