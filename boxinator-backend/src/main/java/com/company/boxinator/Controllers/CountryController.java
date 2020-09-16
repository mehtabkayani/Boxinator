package com.company.boxinator.Controllers;

import com.company.boxinator.Models.Country;
import com.company.boxinator.Repositories.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.util.List;
import java.util.Optional;

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

        try {
            countryRepository.save(country);
            return  ResponseEntity.status(HttpStatus.CREATED).body(country.getCountryName() + " added");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
