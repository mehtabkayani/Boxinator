package com.company.boxinator.Controllers;

import com.company.boxinator.Models.Enums.AccountType;
import com.company.boxinator.Models.Enums.ShipmentStatus;
import com.company.boxinator.Models.Shipment;
import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.ShipmentRepository;
import com.company.boxinator.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ShipmentController {

    @Autowired
    ShipmentRepository shipmentRepository;
    @Autowired
    UserRepository userRepository;


    @GetMapping("/shipment/{id}")
    public ResponseEntity<Shipment> getUserById(@PathVariable("id") int id) {
        Optional<Shipment> userData = shipmentRepository.findById(id);
        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/shipment")
    public String addShipment(@RequestBody Shipment shipment, Integer userId) {
        User user = userRepository.getOne(userId);


        String resMessage = "";
        try {


            resMessage = "succeded";
        } catch (Exception ex) {
            resMessage = ex.getMessage();
        }
        return resMessage;
    }

    @GetMapping("/shipment")
    public String index(){
        return "shipment active";
    }
    @GetMapping("/shipments")
    public ResponseEntity<List<Shipment>> getAllShipmentsByUser(@RequestParam(required = false) Integer user_id) {
        /*List<Shipment> shipments = new ArrayList<Shipment>();
        try {
            User user = userRepository.findUserBy(user_id);

            if (user.accountType == AccountType.ADMINISTRATOR)
                shipmentRepository.findAllByUser(user).forEach(shipments::add);
            else if (user.accountType == AccountType.REGISTERED_USER) {
                shipmentRepository.findAllByShipmentStatusContaining(ShipmentStatus.CANCELLED).forEach(shipments::add);
                shipmentRepository.findAllByShipmentStatusContaining(ShipmentStatus.CREATED).forEach(shipments::add);
            }
            if (shipments.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(shipments, HttpStatus.OK);
        } catch (Exception ex) {
            System.out.println(ex);
        }*/
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }

}

