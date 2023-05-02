package com.herman.Springboottutorial.controller;

import com.herman.Springboottutorial.entity.Room;
import com.herman.Springboottutorial.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @PostMapping("/rooms")
    public Room saveRoom(@RequestBody Room room) {
        return roomService.saveRoom(room);
    }

    @GetMapping("/rooms")
            public List<Room> fetchRoomList(){
                return roomService.fetchRoomList();
    }

    @GetMapping("/rooms/{id}")
    public Room fetchRoomById(@PathVariable("id")Long roomId){
        return roomService.fetchRoomById(roomId);
    }

    @DeleteMapping("/rooms/{id}")
    public void deleteRoomById(@PathVariable("id")Long roomId){
        roomService.deleteRoomById(roomId);
    }

    @PutMapping("/rooms/{id}")
    public Room updateRoom(@PathVariable("id")Long roomId, @RequestBody Room room){
        return roomService.updateRoom(roomId, room);
    }

}

