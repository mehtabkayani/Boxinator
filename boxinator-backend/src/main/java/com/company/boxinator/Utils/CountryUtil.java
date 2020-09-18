package com.company.boxinator.Utils;

import com.company.boxinator.Models.Country;

public class CountryUtil {
    public Country setCountry(Country country, Country newCountry){
        newCountry.setCountryCode(country.getCountryCode());
        newCountry.setCountryName(country.getCountryName());
        newCountry.setMultiplyerNumber(country.getMultiplyerNumber());
        return newCountry;
    }
}
