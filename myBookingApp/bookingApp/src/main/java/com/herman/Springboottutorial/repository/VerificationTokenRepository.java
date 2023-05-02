package com.herman.Springboottutorial.repository;

import com.herman.Springboottutorial.entity.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken,Long> {
    VerificationToken findByToken(String token);
}
