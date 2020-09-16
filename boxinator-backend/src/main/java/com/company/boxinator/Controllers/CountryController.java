package com.company.boxinator.Controllers;

import com.company.boxinator.Models.Country;
import com.company.boxinator.Repositories.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CountryController {

    @Autowired
    CountryRepository countryRepository;

    @GetMapping("/country")
    public List<Country> index() {
        return countryRepository.findAll();
    }


    @PostMapping("/country")
    public ResponseEntity addCountry(@RequestBody Country country){
        countryRepository.save(country);
        return  ResponseEntity.status(HttpStatus.CREATED).body(country.getCountryName() + " Country added");
    }
}
