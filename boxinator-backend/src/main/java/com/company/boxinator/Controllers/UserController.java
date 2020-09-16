package com.company.boxinator.Controllers;

import com.company.boxinator.Models.Enums.AccountType;

import com.company.boxinator.Models.Session;

import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.UserRepository;
import com.company.boxinator.Utils.JwtUtil;
import com.company.boxinator.Utils.SessionUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin()
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserRepository userRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    private JwtUtil jwtUtil = new JwtUtil();
    private SessionUtil sessionUtil = new SessionUtil();

    @PostMapping("/login")
    public String login(@RequestBody User userLogin) {
        User user = userRepository.findByEmail(userLogin.getEmail());

        if(bCryptPasswordEncoder.matches(userLogin.getPassword(), user.getPassword()) && userLogin.getEmail().equals(user.getEmail())){
            sessionUtil.addSession(user);
            return user.getEmail() + " is logged in!";
        }
        return "Wrong credentials!";
    }
    @GetMapping("/sessions")
    public List<Session> getSessions(){
        return sessionUtil.getSessionsList();
    }
    @GetMapping("/user")
    public List<User> getUsers() {
        List<User> listOfAllUsers = userRepository.findAll();

            return listOfAllUsers;
    }


    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") int id) {
        Optional<User> userData = userRepository.findById(id);
        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody User user) {
        String resMessage = "";
        try {
            Optional<User> userData = Optional.ofNullable(userRepository.findByEmail(user.getEmail()));
            System.out.println("pass userData");
            //Check if email already exist and user is a REGISTERED_USER ADMINISTRATOR
            if(userData.isPresent() && userData.get().getAccountType() == AccountType.REGISTERED_USER || userData.get().getAccountType() == AccountType.ADMINISTRATOR ){
                resMessage = "User is already registered!";
                System.out.println(resMessage);
                return ResponseEntity.status(HttpStatus.CONFLICT).body(resMessage);
            }

                //Check if a guest is registering
            if(userData.isPresent() && userData.get().getAccountType() == AccountType.GUEST){
               User guestUser =  userData.get();
               guestUser.setContactNumber(user.getContactNumber());
                guestUser.setCountryOfResidence(user.getCountryOfResidence());
                guestUser.setDateOfBirth(user.getDateOfBirth());
                guestUser.setEmail(user.getEmail());
                guestUser.setFirstname(user.getFirstname());
                guestUser.setLastname(user.getLastname());
                guestUser.setZipcode(user.getZipcode());
                guestUser.setAccountType(AccountType.REGISTERED_USER);
                guestUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
                userRepository.save(guestUser);

                resMessage = guestUser.getEmail() + " is now registered as a REGISTERED_USER!";
                    return ResponseEntity.status(HttpStatus.CREATED).body(resMessage);
            }

            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            resMessage = "A new user is registered successfully!";

        } catch (Exception ex) {
            System.out.println("In catch");
            resMessage = ex.getMessage();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(resMessage);

    }

}
