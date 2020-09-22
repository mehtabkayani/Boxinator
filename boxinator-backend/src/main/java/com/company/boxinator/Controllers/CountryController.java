package com.company.boxinator.Controllers;

import com.company.boxinator.Models.Country;
import com.company.boxinator.Repositories.CountryRepository;
import com.company.boxinator.Utils.CountryUtil;
import com.company.boxinator.Utils.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/settings")
@CrossOrigin(origins = "http://localhost:3000")
public class CountryController {

    @Autowired
    CountryRepository countryRepository;

    private CountryUtil countryUtil = new CountryUtil();

    private SessionUtil sessionUtil = SessionUtil.getInstance();

    @GetMapping("/countries")
    public List<Country> getCountries(@RequestHeader("Authorization") String jwt) {
        return countryRepository.findAll();
    }

    @PostMapping("/countries")
    public ResponseEntity addCountry(@RequestBody Country country, @RequestHeader("Authorization") String jwt){

        try {
            countryRepository.save(country);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
        return  ResponseEntity.status(HttpStatus.CREATED).body(country.getCountryName() + " added");
    }
    @PutMapping("/countries/{country_id}")
    public ResponseEntity getCountryById(@RequestBody Country country,
                                         @PathVariable("country_id") Integer countryId,
                                         @RequestHeader("Authorization") String jwt){
        Optional <Country> findCountry = countryRepository.findById(countryId);
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
