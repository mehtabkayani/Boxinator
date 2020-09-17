package com.company.boxinator.Controllers;

import com.company.boxinator.Models.Enums.AccountType;
import com.company.boxinator.Models.Enums.ShipmentStatus;
import com.company.boxinator.Models.Shipment;
import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.ShipmentRepository;
import com.company.boxinator.Repositories.UserRepository;
import com.company.boxinator.Utils.ShipmentUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ShipmentController {

    @Autowired
    ShipmentRepository shipmentRepository;
    @Autowired
    UserRepository userRepository;

    private ShipmentUtil shipmentUtil = new ShipmentUtil();

    @GetMapping("/shipment")
    public List<Shipment> getAllShipments() {
        return shipmentRepository.findAll();
    }


    @PostMapping("/shipment")
    public ResponseEntity addShipment(@RequestBody Shipment shipment) {
        if(shipment.getUser().getEmail() == null || shipment.getCountry() == null ) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("You are missing a email or country");
        }

        Optional<User> userDB = userRepository.findByEmail(shipment.getUser().getEmail());

        if (userDB.isEmpty()) {
            User user = shipmentUtil.addGuestUser(shipment);
            userRepository.save(user);
            shipmentRepository.save(shipmentUtil.setShipment(shipment, user));
            return ResponseEntity.status(HttpStatus.CREATED).body("New Guest added and shipment created");
        }
        shipmentRepository.save(shipmentUtil.setShipment(shipment, userDB.get()));

        return ResponseEntity.status(HttpStatus.CREATED).body(userDB.get().getEmail() + " added a new shipment");
    }

    @GetMapping("/shipment/{id}")
    public ResponseEntity getUserById(@PathVariable("id") int id) {
        List<Shipment> userData = shipmentRepository.findAllByUserId(id);
        if (userData.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return ResponseEntity.status(HttpStatus.OK).body(userData);
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

