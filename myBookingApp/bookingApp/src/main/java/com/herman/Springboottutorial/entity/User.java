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
public class User {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1

    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator ="user_sequence"
    )
    private Long entryId;
    @Column(name = "name")
    private String userName;
    @Column(name = "surname")
    private String userSurname;
    @Column(
            name = "email",
            nullable = false,
            unique=true
    )
    private String userEmail;
    @Column(length = 60)
    private String password;
    @Column(name = "cell")
    private String phoneNumber;
    private String idNumber;
    private String userRole;
    private boolean enabled = false;
    @OneToMany(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "userRef",
            referencedColumnName = "entryId"
    )
    private List<Booking> booking;
}
