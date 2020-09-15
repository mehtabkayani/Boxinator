package com.company.boxinator.Models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;
import java.util.Set;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String countryCode;

    @Column
    private String countryName;

    @Column
    private String multiplyerNumber;


    public Country(){};

    public Country(String countryCode, String countryName, String multiplyerNumber) {
        this.countryCode = countryCode;
        this.countryName = countryName;
        this.multiplyerNumber = multiplyerNumber;
    };

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getMultiplyerNumber() {
        return multiplyerNumber;
    }

    public void setMultiplyerNumber(String multiplyerNumber) {
        this.multiplyerNumber = multiplyerNumber;
    }
}
