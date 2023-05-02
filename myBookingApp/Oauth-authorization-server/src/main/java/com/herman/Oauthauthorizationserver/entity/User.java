package com.herman.Oauthauthorizationserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long entryId;

    private String userName;

    private String userSurname;

    private String userEmail;
    @Column(length = 60)
    private String password;

    private String phoneNumber;
    private String idNumber;
    private String userRole;
    private boolean enabled = false;

}
