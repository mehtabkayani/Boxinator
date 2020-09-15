package com.company.boxinator.Controllers;

import com.company.boxinator.Models.User;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin()
public class UserController {



    @PostMapping("/register")
    public String register(@RequestBody User user) {


        return "Welcome!";
    }


    @PostMapping("/login")
    public String login(@RequestBody User user) {

        return "Welcome!";
    }
}
