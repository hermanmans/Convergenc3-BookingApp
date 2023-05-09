package com.herman.Springboottutorial.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {
    @Id
    @SequenceGenerator(
            name = "room_sequence",
            sequenceName = "room_sequence",
            allocationSize = 1

    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator ="room_sequence"
    )
    private Long roomId;
    private String roomName;
    private String roomAddress;
    private String roomDescription;
    private String roomCode;
    private String roomImage;

    @OneToMany(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "roomSelected",
            referencedColumnName = "roomName"
    )
    private List<Booking> booking;
}

