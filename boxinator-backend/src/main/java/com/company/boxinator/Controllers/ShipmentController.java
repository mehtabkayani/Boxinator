package com.company.boxinator.Controllers;

import com.company.boxinator.Models.Shipment;
import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.ShipmentRepository;
import com.company.boxinator.Repositories.UserRepository;
import com.company.boxinator.Utils.ShipmentUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api")
public class ShipmentController {

    @Autowired
    ShipmentRepository shipmentRepository;
    @Autowired
    UserRepository userRepository;

    private ShipmentUtil shipmentUtil = new ShipmentUtil();

    @GetMapping("/shipments")
    public List<Shipment> getAllShipments() {
        return shipmentRepository.findAll();
    }

    @GetMapping("shipments/complete")
    public List<Shipment> getCompletedShipments(){
        //Retrieve a list of completed shipments relevant to the authenticated user (as with previous).
        return null;
    }

    @GetMapping("shipments/cancelledRetrieve")
    public List<Shipment> getCancelledShipments(){
    //Retrieve  a  list  of *completed||cancelled?* shipments  relevant  to  the authenticated user (as with previous
        return null;
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


    @GetMapping("/shipments/{shipment_id}")
    public Optional<Shipment> getAllShipmentsByShipmentId(@PathVariable("shipment_id") Integer shipment_id) {
        return shipmentRepository.findById(shipment_id);
    }

    @GetMapping("shipments/complete/{shipment_id}")
    public Shipment getOneCompletedShipment(@PathVariable("shipment_id") Integer shipment_id){
        //Retrieve the details of a single completed shipment
        return null;
    }

    @GetMapping("/shipment/{customer_id}")
    public List<Shipment> getShipmentsUserById(@PathVariable("customer_id") Integer customer_id) {
        // Retrieve the details of all the shipments a given customer has made.

        List<Shipment> listOfShipments = shipmentRepository.findAll();

        Stream<Shipment> userListOfShipment = listOfShipments.stream().filter(shipment -> shipment.getUser().getId() == customer_id);

        List<Shipment> result = userListOfShipment.map(shipment -> {
            Shipment shipmentDetail = new Shipment();
            shipmentDetail.setId(shipment.getId());
            shipmentDetail.setRecieverName(shipment.getRecieverName());
            shipmentDetail.setWeight(shipment.getWeight());
            shipmentDetail.setBoxcolor(shipment.getBoxcolor());
            shipmentDetail.setCreation_date(shipment.getCreation_date());
            shipmentDetail.setShipmentStatus(shipment.getShipmentStatus());
            shipmentDetail.setShipmentCost(shipment.getShipmentCost());
            shipmentDetail.setUser(shipment.getUser());
            shipmentDetail.getUser().setPassword("");
            shipmentDetail.setCountry(shipment.getCountry());
            return shipmentDetail;
        }).collect(Collectors.toList());
        return result;
    }

    @GetMapping("shipments/complete/{customer_id}")
    public List<Shipment> getAllCompletedShipmentsByCustomerId(@PathVariable("customer_id") Integer customer_id){
        //Retrieve the details of all the completed shipments a given customer has made.
        // NOTE:You will need to ensure that a customer_id can be differentiated from a shipment_id by using a regex expression.
        return null;
    }

    @GetMapping("shipments/{customer_id}/{shipment_id}")
    public Shipment getShipmentByCustomerIdAndShipmentId(@PathVariable("customer_id") Integer customer_id, @PathVariable("shipment_id") Integer shipment_id){
        //Retrieve the details of a specific shipment made by a specific customer
        return null;
    }

    @PostMapping("shipments/{shipment_id}")
    public Shipment updateAShipmentById(@PathVariable("shipment_id") Integer shipment_id){
        //This endpoint is used to update a shipment, but a non-Administrator user may only cancel a shipment.
        // An administrator can make any changes they wish to a shipment.
        // The administrator will use this to mark a shipment as completed.2.
    return null;
    }

    @DeleteMapping("shipments/{shipment_id}")
    public Shipment deleteShipmentById(@PathVariable("shipment_id") Integer shipment_id){
        //This  endpoint  is  used  to  delete  a  shipment  only  in  extreme  situations,  and only accessible by an Administrator.
        // (This will also delete completed/cancelled shipments.)
        return null;
    }




//
//    @GetMapping("/shipments")
//    public ResponseEntity<List<Shipment>> getAllShipmentsByUser(@RequestParam(required = false) Integer user_id) {
//        /*List<Shipment> shipments = new ArrayList<Shipment>();
//        try {
//            User user = userRepository.findUserBy(user_id);
//
//            if (user.accountType == AccountType.ADMINISTRATOR)
//                shipmentRepository.findAllByUser(user).forEach(shipments::add);
//            else if (user.accountType == AccountType.REGISTERED_USER) {
//                shipmentRepository.findAllByShipmentStatusContaining(ShipmentStatus.CANCELLED).forEach(shipments::add);
//                shipmentRepository.findAllByShipmentStatusContaining(ShipmentStatus.CREATED).forEach(shipments::add);
//            }
//            if (shipments.isEmpty())
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            return new ResponseEntity<>(shipments, HttpStatus.OK);
//        } catch (Exception ex) {
//            System.out.println(ex);
//        }*/
//        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
//    }

}

