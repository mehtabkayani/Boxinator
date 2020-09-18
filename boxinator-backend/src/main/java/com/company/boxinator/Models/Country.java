package com.company.boxinator.Models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(	name = "country",
        uniqueConstraints = {

                @UniqueConstraint(columnNames = "countryCode"),
                @UniqueConstraint(columnNames = "countryName")
        })
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
    private Integer multiplyerNumber;


    public Country(){};

    public Country(String countryCode, String countryName, Integer multiplyerNumber) {
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

    public Integer getMultiplyerNumber() {
        return multiplyerNumber;
    }

    public void setMultiplyerNumber(Integer multiplyerNumber) {
        this.multiplyerNumber = multiplyerNumber;
    }
}
