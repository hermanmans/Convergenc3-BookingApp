package com.herman.Springboottutorial.controller;

import com.herman.Springboottutorial.entity.User;
import com.herman.Springboottutorial.event.RegistrationCompleteEvent;
import com.herman.Springboottutorial.model.UserModel;
import com.herman.Springboottutorial.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RegistrationController {
    @Autowired
    private UserService userService;
    @Autowired
    private ApplicationEventPublisher publisher;
    @PostMapping("/register")
    public String registerUser(@RequestBody UserModel userModel, final HttpServletRequest request) {
        User user = userService.registerUser(userModel);
        publisher.publishEvent(new RegistrationCompleteEvent(
                user,
                applicationUrl(request)
        ));
        return "Success";
    }

    private String applicationUrl(HttpServletRequest request) {
        return "http://" +
                request.getServerName() +
                ":" +
                request.getServerPort() +
                request.getContextPath();
    }
    @GetMapping("/verifyRegistration")
    public String verifyRegistration(@RequestParam("token") String token) {
        String result = userService.validateVerificationToken(token);
        if(result.equalsIgnoreCase("valid")) {
            return "User Verified Successfully";
        }
        return "Bad User";
    }
    @GetMapping("/register")
    public List<User> fetchUserList() {
       return userService.fetchUserList();
    }

    @GetMapping("/login/{password}/{email}")
    public User fetchUserByLoginDetails(@PathVariable("password")String password,@PathVariable("email") String email) throws UserPrincipalNotFoundException {
        return userService.fetchUserByLoginDetails(password,email);
    }

    @GetMapping("/register/{id}")
    public User fetchUserById(@PathVariable("id") Long entryId) {
        return userService.fetchUserById(entryId);
    }
}
