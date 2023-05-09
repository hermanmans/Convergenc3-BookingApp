package com.herman.Springboottutorial.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Refund {
    @Id
    @SequenceGenerator(
            name = "refund_sequence",
            sequenceName = "refund_sequence",
            allocationSize = 1

    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator ="refund_sequence"
    )
    private Long refundId;

    private String startDate;

    private String endDate;

    private Long duration;

    private float total;

    private Long userRef;

    private String roomSelected;

    private Long timeToVisit;
    private double refundAmount;

}
