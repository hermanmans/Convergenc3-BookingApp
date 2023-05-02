package com.herman.Oauthauthorizationserver.repository;

import com.herman.Oauthauthorizationserver.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByUserEmail(String userEmail);
}
