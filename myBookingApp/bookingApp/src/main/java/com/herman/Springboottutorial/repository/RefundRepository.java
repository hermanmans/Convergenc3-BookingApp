package com.herman.Springboottutorial.repository;

import com.herman.Springboottutorial.entity.Refund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RefundRepository extends JpaRepository<Refund,Long> {
    List<Refund> findByUserRef(Long userRef);
}
