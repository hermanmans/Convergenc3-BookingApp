package com.herman.Springboottutorial.model;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {
    @Column(name = "name")
    private String userName;
    @Column(name = "surname")
    private String userSurname;
    @Column(
            name = "email",
            nullable = false
    )
    private String userEmail;
    @Column(length = 60)
    private String password;
    private String matchingPassword;
    @Column(name = "cell")
    private String phoneNumber;
    private String idNumber;



}
