package com.herman.Springboottutorial.service;

import com.herman.Springboottutorial.entity.User;
import com.herman.Springboottutorial.entity.VerificationToken;
import com.herman.Springboottutorial.model.UserModel;
import com.herman.Springboottutorial.repository.BookingRepository;
import com.herman.Springboottutorial.repository.UserRepository;
import com.herman.Springboottutorial.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.Calendar;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VerificationTokenRepository verificationTokenRepository;
    @Autowired
    private BookingRepository bookingRepository;
//    @Autowired
//    private PasswordEncoder passwordEncoder;
    @Override
    public User registerUser(UserModel userModel) {
        var user = new User();
        user.setUserName(userModel.getUserName());
        user.setUserSurname(userModel.getUserSurname());
        user.setUserEmail(userModel.getUserEmail());
        user.setPassword((userModel.getPassword()));
        user.setPhoneNumber(userModel.getPhoneNumber());
        user.setIdNumber(userModel.getIdNumber());
        user.setUserRole("USER");
//        bookingRepository.save(Booking.builder()
//                .user_id(user.getEntryId())
//                .build());
        userRepository.save(user);
        return user;
    }

    @Override
    public List<User> fetchUserList() {
        return userRepository.findAll();
    }

    @Override
    public void saveVerificationTokenForUser(User user, String token) {
        VerificationToken verificationToken = new VerificationToken(user,token);
        verificationTokenRepository.save(verificationToken);

    }

    @Override
    public String validateVerificationToken(String token) {
        VerificationToken verificationToken
                = verificationTokenRepository.findByToken(token);

        if (verificationToken == null) {
            return "invalid";
        }
        User user = verificationToken.getUser();
        Calendar cal = Calendar.getInstance();

        if ((verificationToken.getExpirationTime().getTime()
                - cal.getTime().getTime()) <= 0) {
            verificationTokenRepository.delete(verificationToken);
            return "expired";
        }

        user.setEnabled(true);
        userRepository.save(user);
        return "valid";
    }

    @Override
    public User fetchUserById(Long entryId) {
        return userRepository.findById(entryId).get();
    }

    @Override
    public User fetchUserByLoginDetails(String password, String email) throws UserPrincipalNotFoundException {
            return userRepository.findByPasswordAndUserEmail(password, email);
    }

}
