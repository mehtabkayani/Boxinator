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
    public Integer id;

    @Column
    public String countryCode;

    @Column
    public String countryName;

    @Column
    public String multiplyerNumber;

    @OneToMany(mappedBy = "shipment", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Shipment> shipments;

    public Country(){};

    public Country(String countryCode, String countryName, String multiplyerNumber, Set<Shipment> shipments) {
        this.countryCode = countryCode;
        this.countryName = countryName;
        this.multiplyerNumber = multiplyerNumber;
        this.shipments = shipments;
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

    public Set<Shipment> getShipments() {
        return shipments;
    }

    public void setShipments(Set<Shipment> shipments) {
        this.shipments = shipments;
    }
}
