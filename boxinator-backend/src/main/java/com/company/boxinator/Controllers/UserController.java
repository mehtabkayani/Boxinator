package com.company.boxinator.Controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin()
public class UserController {
    @RequestMapping(value = "/greeting", method = RequestMethod.GET)
    public String getEmployees() {
        return "Welcome!";
    }
}
