package com.herman.Springboottutorial.service;

import com.herman.Springboottutorial.entity.Room;
import com.herman.Springboottutorial.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public List<Room> fetchRoomList() {
        return roomRepository.findAll();
    }

    @Override
    public Room fetchRoomById(Long roomId) {
        return roomRepository.findById(roomId).get();
    }

    @Override
    public void deleteRoomById(Long roomId) {
        roomRepository.deleteById(roomId);
    }

    @Override
    public Room updateRoom(Long roomId, Room room) {
        Room roomDb = roomRepository.findById(roomId).get();
        //validation if
        roomDb.setRoomName(room.getRoomName());
        //validation if
        roomDb.setRoomCode(room.getRoomCode());
        //validation if
        roomDb.setRoomAddress(room.getRoomAddress());
        return roomRepository.save(roomDb);
    }


}
