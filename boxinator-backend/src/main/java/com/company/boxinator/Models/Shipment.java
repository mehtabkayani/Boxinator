package com.company.boxinator.Models;

import com.company.boxinator.Models.Enums.ShipmentStatus;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column
    private String recieverName;

    @Column
    private float weight;

    @Column
    private String boxcolor;

    @Column
    private String creation_date;

    @Column
    private ShipmentStatus shipmentStatus;

    @Column
    private double shipmentCost;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    public Shipment() {
    }

    public Shipment(String recieverName, float weight, String boxcolor, String creation_date, ShipmentStatus shipmentStatus, User user) {

        this.recieverName = recieverName;
        this.weight = weight;
        this.boxcolor = boxcolor;
        this.creation_date = creation_date;
        this.shipmentStatus = shipmentStatus;
        this.user = user;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRecieverName() {
        return recieverName;
    }

    public void setRecieverName(String recieverName) {
        this.recieverName = recieverName;
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

    public String getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(String creation_date) {
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

    public double getShipmentCost() {
        return shipmentCost;
    }

    public void setShipmentCost(double shipmentCost) {
        this.shipmentCost = shipmentCost;
    }
}
