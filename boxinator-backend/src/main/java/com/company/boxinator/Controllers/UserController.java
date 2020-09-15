package com.company.boxinator.Controllers;

import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

@Autowired
    UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
      return userRepository.save(user);

    }

    @GetMapping("/users")
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/hi")
    public String hello(){
        System.out.println("hello");
        return "Hello";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        return "Welcome!";
    }
}
