package com.company.boxinator.Controllers;

import com.company.boxinator.Config.SecurityConf;
import com.company.boxinator.Models.Country;
import com.company.boxinator.Models.Enums.AccountType;
import com.company.boxinator.Repositories.CountryRepository;
import com.company.boxinator.Utils.CountryUtil;
import com.company.boxinator.Utils.JwtUtil;
import com.company.boxinator.Utils.SessionUtil;
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

    private SessionUtil sessionUtil = SessionUtil.getInstance();

    private JwtUtil jwtUtil = new JwtUtil();

    private SecurityConf securityConf = new SecurityConf();

//Get a specific country
    @GetMapping("/country/{id}")
    public ResponseEntity<Country> getCountry(@PathVariable ("id") Integer id) {
        return new ResponseEntity<>(countryRepository.findById(id).get(), HttpStatus.OK);
    }
//Get all countries
    @GetMapping("/countries")
    public ResponseEntity<List<Country>> getCountries() {
        return new ResponseEntity<>(countryRepository.findAll(), HttpStatus.OK);
    }
//Admin and registered_user can add a new country
    @PostMapping("/countries")
    public ResponseEntity addCountry(@RequestBody Country country, @RequestHeader("Authorization") String jwt){
        if(!(jwtUtil.tokenAccountType(jwt) == AccountType.ADMINISTRATOR))
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        if(!(securityConf.validInputs(country.getCountryCode(), country.getCountryName())))
            return new ResponseEntity(HttpStatus.FORBIDDEN);

        try {
            countryRepository.save(country);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
        return  ResponseEntity.status(HttpStatus.CREATED).body(country.getCountryName() + " added");
    }
    //Update specific country
    @PutMapping("/countries/{country_id}")
    public ResponseEntity getCountryById(@RequestBody Country country,
                                         @PathVariable("country_id") Integer countryId,
                                         @RequestHeader("Authorization") String jwt){
        Optional<Country> findCountry = countryRepository.findById(countryId);
        if(!findCountry.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");
        Country updateCountry = countryUtil.setCountry(country, findCountry.get());
        if(!securityConf.validInputs(updateCountry.getCountryName(), updateCountry.getCountryCode()))
            return new ResponseEntity(HttpStatus.FORBIDDEN);

        try {
            countryRepository.save(countryUtil.setCountry(country, findCountry.get()));
        } catch (Exception ex){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Failed");
        }

        return ResponseEntity.status(HttpStatus.OK).body("Country update success");
    }
}
