package com.company.boxinator.Controllers;

import com.company.boxinator.Models.Enums.AccountType;

import com.company.boxinator.Models.Session;

import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.UserRepository;
import com.company.boxinator.Utils.JwtUtil;
import com.company.boxinator.Utils.SessionUtil;
import com.company.boxinator.Utils.UserUtil;
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

    private UserUtil userUtil = new UserUtil();

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    private JwtUtil jwtUtil = new JwtUtil();
    private SessionUtil sessionUtil = SessionUtil.getInstance();

    @PostMapping("/login")
    public ResponseEntity<Session> login(@RequestBody User userLogin) {
       Optional <User> user = userRepository.findByEmail(userLogin.getEmail());

            if(bCryptPasswordEncoder.matches(userLogin.getPassword(), user.get().getPassword()) && userLogin.getEmail().equals(user.get().getEmail())) {
                sessionUtil.addSession(user.get());
            return new ResponseEntity<>(sessionUtil.getSession(user.get().getId()).get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);

    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(@RequestHeader("Authorization") String jwt) {
        if(!sessionUtil.isSessionValid(jwt))
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

//        List<User> listOfAllUsers = userRepository.findAll();

        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") int id, @RequestHeader("Authorization") String jwt) {
        Optional<User> userData = userRepository.findById(id);
        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/user/{id}")
    public ResponseEntity updateUserById(@RequestBody User user, @PathVariable("id") Integer id, @RequestHeader("Authorization") String jwt){
        Optional<User> userData = userRepository.findById(id);
        if(!userData.isPresent())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        User updatedUser = userUtil.setUser(user, userData.get());
        try {
            userRepository.save(updatedUser);
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Not accepted");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Updated user");
    }

    @PostMapping("/user")
    public ResponseEntity addUser(@RequestBody User user){
        Optional<User> userData = userRepository.findByEmail(user.getEmail());

        //Check if there is no email registered then register a new user
        if(userData.isPresent()){
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
            User guestUser =  userUtil.setUser(userData.get(), new User());
            userRepository.save(guestUser);

            return ResponseEntity.status(HttpStatus.CREATED).body(guestUser.getEmail() + " is now registered as a REGISTERED_USER!");
        }
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Something went wrong");
    }
    @DeleteMapping("/user")
    public ResponseEntity deleteUser(@RequestBody User user, @RequestHeader("Authorization") String jwt){
        try{
            userRepository.delete(user);
        } catch (Exception ex){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Delete failed");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Delete succeded");
    }
    @GetMapping("/jwt/{jwtw}")
    public boolean isSessionValid(@PathVariable("jwtw") String jwt){
        return sessionUtil.isSessionValid(jwt);
    }
    @GetMapping("/sessions")
    public List<Session> sessions(){
        return sessionUtil.getSessionsList();
    }
    @GetMapping("/removesession/{session_id}")
    public void s(@PathVariable("session_id") Integer id){
        sessionUtil.removeSession(id);
    }
}
