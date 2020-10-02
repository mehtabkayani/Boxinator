package com.company.boxinator.Models;

import com.company.boxinator.Models.Enums.ShipmentStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.FetchType.LAZY;

@Entity
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "id"
//)
public class Shipment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column
    private String receiverName;

    @Column
    private float weight;

    @Column
    private String boxcolor;

    @Column
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
    private LocalDateTime creation_date;


    @Column
    private ShipmentStatus shipmentStatus;

    @Column
    private double shipmentCost;

    @Column
    private Integer shipmentMultiplyerNumber;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;

    public Shipment() {
    }

    public Shipment(String receiverName, float weight, String boxcolor, User user, Country country) {

        this.receiverName = receiverName;
        this.weight = weight;
        this.boxcolor = boxcolor;
        this.country = country;
        this.user = user;
    }

    public Shipment(Integer id, String receiverName, float weight, String boxcolor, LocalDateTime creation_date, ShipmentStatus shipmentStatus, double shipmentCost, Country country) {
        this.id = id;
        this.receiverName = receiverName;
        this.weight = weight;
        this.boxcolor = boxcolor;
        this.creation_date = creation_date;
        this.shipmentStatus = shipmentStatus;
        this.shipmentCost = shipmentCost;
        this.country = country;

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String recieverName) {
        this.receiverName = recieverName;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public String getBoxcolor() {
        return boxcolor;
    }

    public void setBoxcolor(String boxcolor) {
        this.boxcolor = boxcolor;
    }

    public Integer getShipmentMultiplyerNumber() {
        return shipmentMultiplyerNumber;
    }

    public void setShipmentMultiplyerNumber(Integer shipmentMultiplyerNumber) {
        this.shipmentMultiplyerNumber = shipmentMultiplyerNumber;
    }

    public LocalDateTime getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(LocalDateTime creation_date) {
        this.creation_date = creation_date;
    }

    public ShipmentStatus getShipmentStatus() {
        return shipmentStatus;
    }

    public void setShipmentStatus(ShipmentStatus shipmentStatus) {
        this.shipmentStatus = shipmentStatus;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public double getShipmentCost() {
        return shipmentCost;
    }

    public void setShipmentCost(double shipmentCost) {
        this.shipmentCost = shipmentCost;
    }
}
