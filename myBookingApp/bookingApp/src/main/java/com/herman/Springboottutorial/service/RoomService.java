package com.herman.Springboottutorial.service;

import com.herman.Springboottutorial.entity.Room;

import java.util.List;

public interface RoomService {
    Room saveRoom(Room room);

    List<Room> fetchRoomList();

    Room fetchRoomById(Long roomId);

    void deleteRoomById(Long roomId);

    Room updateRoom(Long roomId, Room room);

}


