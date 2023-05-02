package com.herman.Springboottutorial.service;

import com.herman.Springboottutorial.entity.User;
import com.herman.Springboottutorial.model.UserModel;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

public interface UserService{

    User registerUser(UserModel userModel);

    List<User> fetchUserList();

    void saveVerificationTokenForUser(User user, String token);

    String validateVerificationToken(String token);

    User fetchUserById(Long entryId);

    User fetchUserByLoginDetails(String password,String email) throws UserPrincipalNotFoundException;
}
