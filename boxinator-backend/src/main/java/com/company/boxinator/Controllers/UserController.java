package com.company.boxinator.Controllers;

import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.UserRepository;
import com.company.boxinator.Utils.Jwt;
import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin()
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserRepository userRepository;

    Jwt jwt;

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();


    @PostMapping("/login")
    public String login(@RequestBody User userLogin) {
        User user = userRepository.findByEmail(userLogin.getEmail());

        String signature = "Should be empty";
        try{
            if(bCryptPasswordEncoder.matches(userLogin.getPassword(),user.getPassword())){
                System.out.println("BCRYPT");
                signature = jwt.getToken("kalle@gmail.com");
                System.out.println("Signature: " + signature);
                }
                System.out.println("Matches?" + bCryptPasswordEncoder.matches(userLogin.getPassword(),user.getPassword()));
            }
        catch (Exception e){
            signature = e.getMessage();
        }

        //RETURN JWT String
        return signature;
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
    public String registerUser(@RequestBody User user) {
        String resMessage = "";
        try {

            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            resMessage = "succeded";
        } catch (Exception ex) {
            resMessage = ex.getMessage();
        }
        return resMessage;
    }



}
