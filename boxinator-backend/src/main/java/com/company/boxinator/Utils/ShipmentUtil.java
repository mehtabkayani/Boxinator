package com.company.boxinator.Utils;

import com.company.boxinator.Models.Enums.AccountType;
import com.company.boxinator.Models.Enums.ShipmentStatus;
import com.company.boxinator.Models.Shipment;
import com.company.boxinator.Models.User;
import com.company.boxinator.Models.UserDTO;
import com.company.boxinator.Repositories.ShipmentRepository;
import com.company.boxinator.Repositories.UserRepository;

import java.time.LocalDateTime;

public class ShipmentUtil {
    private UserRepository userRepository;
    private ShipmentRepository shipmentRepository;

    public Shipment setShipment(Shipment shipment, User user){
        Shipment newShipment = new Shipment();
        newShipment.setUser(user);
        newShipment.setRecieverName(shipment.getRecieverName());
        newShipment.setBoxcolor(shipment.getBoxcolor());
        newShipment.setCountry(shipment.getCountry());
        newShipment.setWeight(shipment.getWeight());
        double cost = newShipment.getWeight() * newShipment.getCountry().getMultiplyerNumber();
        newShipment.setShipmentCost(cost);
        newShipment.setShipmentMultiplyerNumber(shipment.getCountry().getMultiplyerNumber());
        newShipment.setShipmentStatus(ShipmentStatus.CREATED);
        newShipment.setCreation_date(LocalDateTime.now());
        return newShipment;
    }
    public User addGuestUser(Shipment shipment){
        User user = new User();
        user.setEmail(shipment.getUser().getEmail());
        user.setAccountType(AccountType.GUEST);
        return user;
    }
    public Shipment updateShipment(Shipment oldShipment, Shipment newShipment, User user){
        newShipment.setUser(user);
        newShipment.setRecieverName(oldShipment.getRecieverName());
        newShipment.setBoxcolor(oldShipment.getBoxcolor());
        newShipment.setCountry(oldShipment.getCountry());
        newShipment.setWeight(oldShipment.getWeight());
        double cost = newShipment.getWeight() * newShipment.getCountry().getMultiplyerNumber();
        newShipment.setShipmentCost(cost);
        newShipment.setShipmentMultiplyerNumber(oldShipment.getCountry().getMultiplyerNumber());
        newShipment.setShipmentStatus(oldShipment.getShipmentStatus());
        return newShipment;
    }
}
