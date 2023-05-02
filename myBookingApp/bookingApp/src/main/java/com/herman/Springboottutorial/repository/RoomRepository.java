package com.herman.Springboottutorial.repository;

import com.herman.Springboottutorial.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room,Long> {
}
