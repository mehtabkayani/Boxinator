package com.company.boxinator.Controllers;

import com.company.boxinator.Models.Country;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CountryController {
    @GetMapping("/country")
    public String index(){
        return "country active";
    }
}
