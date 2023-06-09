package com.herman.Springboottutorial.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Booking {
    final float roomRate = 120;
    @Id
    @SequenceGenerator(
            name = "booking_sequence",
            sequenceName = "booking_sequence",
            allocationSize = 1

    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator ="booking_sequence"
    )
    private Long bookingKey;
    @Temporal(TemporalType.DATE)
    private Date startDate;

    private Date endDate;

    private Long duration;

    private String status;
    private float total;
    private Long userRef;
    private String roomSelected;



//    @JoinTable(
//            name = "room_id",
//            joinColumns = @JoinColumn(
//                    name = "room_id",
//           referencedColumnName = "roomId"
//            ),
//            inverseJoinColumns = @JoinColumn(
//                    name = "room_id",
//                    referencedColumnName = "roomId"
//            )
//    )


}
