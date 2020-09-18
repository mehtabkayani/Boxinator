package com.company.boxinator.Controllers;

import com.company.boxinator.Models.Country;
import com.company.boxinator.Repositories.CountryRepository;
import com.company.boxinator.Utils.CountryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/settings")
public class CountryController {

    @Autowired
    CountryRepository countryRepository;

    private CountryUtil countryUtil = new CountryUtil();

    @GetMapping("/countries")
    public List<Country> index() {
        return countryRepository.findAll();
    }

    @PostMapping("/countries")
    public ResponseEntity addCountry(@RequestBody Country country){

        try {
            countryRepository.save(country);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
        return  ResponseEntity.status(HttpStatus.CREATED).body(country.getCountryName() + " added");
    }
    @PutMapping("/countries/{country_id}")
    public ResponseEntity getCountryById(@RequestBody Country country, @PathVariable("country_id") Integer countryId){
        Optional<Country> findCountry = countryRepository.findById(countryId);
        if(!findCountry.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");

        try {
            countryRepository.save(countryUtil.setCountry(country, findCountry.get()));
        } catch (Exception ex){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Failed");
        }

        return ResponseEntity.status(HttpStatus.OK).body("Country update success");
    }
}
