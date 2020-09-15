package com.company.boxinator.Controllers;

import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.UserRepository;
import com.company.boxinator.Utils.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin()
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserRepository userRepository;

    private JwtUtil jwtUtil = new JwtUtil();

    @GetMapping("/user")
    public String index() {
        return "user active";
}
    @RequestMapping(value = "/greeting", method = RequestMethod.GET)
    public String getEmployees() {

        return "Welcome!";
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") int id) {
        Optional<User> userData = userRepository.findById(id);
        if (userData.isPresent()) {
            System.out.println("userData is present");
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        }
        else {
            System.out.println("userData is NOT present");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/register")
    public String registerUser(@RequestBody User user){
        String resMessage = "";
        try {
            userRepository.save(user);
            resMessage = "succeded";
        }catch (Exception ex)
        {
            resMessage = ex.getMessage();
        }
        return resMessage;
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
