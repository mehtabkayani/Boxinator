package com.company.boxinator.Repositories;

import com.company.boxinator.Models.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepository extends JpaRepository<Country, Integer> {
    Country findByCountryCode(String countryCode);
    Country findByCountryName(String countryName);
}
