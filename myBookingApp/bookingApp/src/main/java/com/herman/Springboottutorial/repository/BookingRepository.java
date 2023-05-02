package com.herman.Springboottutorial.repository;

import com.herman.Springboottutorial.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByUserRef(Long userRef);
}
