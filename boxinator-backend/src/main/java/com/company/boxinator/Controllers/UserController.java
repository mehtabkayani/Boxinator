package com.company.boxinator.Controllers;

import com.company.boxinator.Models.Enums.AccountType;
import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.UserRepository;
import com.company.boxinator.Utils.JwtUtil;
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


    @PostMapping("/login")
    public String login(@RequestBody User userLogin) {
       Optional <User> user = userRepository.findByEmail(userLogin.getEmail());

        if(bCryptPasswordEncoder.matches(userLogin.getPassword(), user.get().getPassword()) && userLogin.getEmail().equals(user.get().getEmail())) {

            return user.get().getEmail() + " is logged in!";
        }
        return "Wrong credentials!";

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
    public ResponseEntity addUser(@RequestBody User user){
        Optional<User> userData = userRepository.findByEmail(user.getEmail());

        //Check if there is no email registered then register a new user
        if(userData.isEmpty()){
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setAccountType(AccountType.REGISTERED_USER);
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("A New user is registered!");
        }
        //Check if the email is registered with an user or an admin
        if(userData.isPresent() && (userData.get().getAccountType() == AccountType.REGISTERED_USER || userData.get().getAccountType() == AccountType.ADMINISTRATOR) ){

            return ResponseEntity.status(HttpStatus.CONFLICT).body("User is already registered!");
        }

        //Check if the email exists and that the account type is a GUEST then register user as Registered_USER
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

            return ResponseEntity.status(HttpStatus.CREATED).body(guestUser.getEmail() + " is now registered as a REGISTERED_USER!");
        }
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Something went wrong");


    }


    @GetMapping("/getJWT")
    public String getJwt(){
        System.out.println("In getJwT");
        return jwtUtil.createJWT("email", "ADMINISTRATOR");
    }
    @GetMapping("/parseJWT/{jwt}")
    public Jws<Claims> parseJWT(@PathVariable("jwt") String jwt){
        System.out.println("In parseJWT");
        return jwtUtil.parseJWT(jwt, "ADMINISTRATOR");
    }


}
