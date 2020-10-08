package com.company.boxinator.Utils;

import com.company.boxinator.Models.Enums.AccountType;
import com.company.boxinator.Models.Enums.ShipmentStatus;
import com.company.boxinator.Models.Shipment;
import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.ShipmentRepository;
import com.company.boxinator.Repositories.UserRepository;

import java.nio.channels.ShutdownChannelGroupException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ShipmentUtil {
    private UserRepository userRepository;
    private ShipmentRepository shipmentRepository;

    public Shipment setShipment(Shipment shipment, User user){
        Shipment newShipment = new Shipment();
        newShipment.setUser(user);
        newShipment.setReceiverName(shipment.getReceiverName());
        newShipment.setBoxcolor(shipment.getBoxcolor());
        newShipment.setCountry(shipment.getCountry());
        newShipment.setWeight(shipment.getWeight());
        double cost = newShipment.getWeight() * newShipment.getCountry().getMultiplyerNumber();
        newShipment.setShipmentCost(cost);
        newShipment.setShipmentMultiplyerNumber(shipment.getCountry().getMultiplyerNumber());
        newShipment.setShipmentStatus(ShipmentStatus.CREATED);
        newShipment.setCreation_date(LocalDate.now().toString());
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
        newShipment.setReceiverName(oldShipment.getReceiverName());
        newShipment.setBoxcolor(oldShipment.getBoxcolor());
        newShipment.setCountry(oldShipment.getCountry());
        newShipment.setWeight(oldShipment.getWeight());
        double cost = newShipment.getWeight() * newShipment.getCountry().getMultiplyerNumber();
        newShipment.setShipmentCost(cost);
        newShipment.setShipmentMultiplyerNumber(oldShipment.getCountry().getMultiplyerNumber());
        newShipment.setShipmentStatus(oldShipment.getShipmentStatus());
        return newShipment;
    }
    public List<Shipment> orderLatestShipment(List<Shipment> shipments){
        return shipments.stream()
                .sorted(Comparator.comparing(Shipment::getCreation_date).reversed())
                .collect(Collectors.toList());
    }
    public List<Shipment> filterByStatus(List<Shipment> shipments, ShipmentStatus shipmentStatus){
        return shipments.stream().filter(shipment -> shipment.getShipmentStatus() == shipmentStatus).collect(Collectors.toList());
    }
    public List<Shipment> filterAdminList(List<Shipment> shipments){
        return shipments.stream()
                .filter(shipment -> (shipment.getShipmentStatus() != ShipmentStatus.CANCELLED) && (shipment.getShipmentStatus() != ShipmentStatus.COMPLETED))
                .collect(Collectors.toList());
    }
    public List<Shipment> filterByCompletedOrIntransit(List<Shipment> shipments){
        return shipments.stream()
                .filter(shipment -> shipment.getShipmentStatus() == ShipmentStatus.INTRANSIT || shipment.getShipmentStatus() == ShipmentStatus.COMPLETED)
                .collect(Collectors.toList());
    }

}
