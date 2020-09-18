package com.company.boxinator.Controllers;

import com.company.boxinator.Models.Enums.AccountType;
import com.company.boxinator.Models.Enums.ShipmentStatus;
import com.company.boxinator.Models.Shipment;
import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.ShipmentRepository;
import com.company.boxinator.Repositories.UserRepository;
import com.company.boxinator.Utils.JwtUtil;
import com.company.boxinator.Utils.SessionUtil;
import com.company.boxinator.Utils.ShipmentUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
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

    private SessionUtil sessionUtil = SessionUtil.getInstance();
    private ShipmentUtil shipmentUtil = new ShipmentUtil();
    private JwtUtil jwtUtil = new JwtUtil();

    @GetMapping("/shipments")
    public ResponseEntity<List<Shipment>> getAllShipments(@RequestHeader("Authorization") String jwt) {
        System.out.println("JWT: " + jwt);
        if(!sessionUtil.isSessionValid(jwt))
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        System.out.println("Is valid");
        return new ResponseEntity<>(shipmentRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("shipments/complete")
    public List<Shipment> getCompletedShipments(@RequestHeader("Authorization") String jwt){
        //Retrieve a list of completed shipments relevant to the authenticated user (as with previous).

        return null;
    }

    @GetMapping("shipments/cancelledRetrieve")
    public List<Shipment> getCancelledShipments(@RequestHeader("Authorization") String jwt){
    //Retrieve  a  list  of *completed||cancelled?* shipments  relevant  to  the authenticated user (as with previous
        return null;
    }

    @PostMapping("/shipment")
    public ResponseEntity addShipment(@RequestBody Shipment shipment, @RequestHeader(value = "Authorization", required = false) String jwt) {
        if(jwt == null){
            if(shipment.getUser().getEmail() == null || shipment.getCountry() == null ) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("You are missing a email or country");
            }
            User user = shipmentUtil.addGuestUser(shipment);

            if(!userRepository.existsByEmail(user.getEmail())){
                userRepository.save(user);
                shipmentRepository.save(shipmentUtil.setShipment(shipment, user));
            } else {
                shipmentRepository.save(shipmentUtil.setShipment(shipment, userRepository.findByEmail(shipment.getUser().getEmail()).get()));
            }
            return ResponseEntity.status(HttpStatus.CREATED).body("New Guest added and shipment created");
        }

        if(!sessionUtil.isSessionValid(jwt))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User has been logged out, sign in again");

        if(shipment.getCountry() == null ) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("You are missing a country");
        }

        Integer userId = jwtUtil.getJwtId(jwt);
        User user = userRepository.getOne(userId);

        shipmentRepository.save(shipmentUtil.setShipment(shipment, user));

        return ResponseEntity.status(HttpStatus.CREATED).body(user.getEmail() + " added a new shipment");
    }


    @GetMapping("/shipments/{shipment_id}")
    public Optional<Shipment> getAllShipmentsByShipmentId(@PathVariable("shipment_id") Integer shipment_id, @RequestHeader("Authorization") String jwt) {
        return shipmentRepository.findById(shipment_id);
    }


    @GetMapping("shipments/complete/{shipment_id}")
    public Shipment getOneCompletedShipment(@PathVariable("shipment_id") Integer shipment_id, @RequestHeader("Authorization") String jwt){
        //Retrieve the details of a single completed shipment
        return null;
    }

    @GetMapping("/shipment/{customer_id}")
    public List<Shipment> getShipmentsUserById(@PathVariable("customer_id") Integer customer_id, @RequestHeader("Authorization") String jwt) {
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
            shipmentDetail.setCountry(shipment.getCountry());

            return shipmentDetail;
        }).collect(Collectors.toList());

        return result;
    }

    @GetMapping("shipments/complete/{customer_id}")
    public List<Shipment> getAllCompletedShipmentsByCustomerId(@PathVariable("customer_id") Integer customer_id, @RequestHeader("Authorization") String jwt){
        //Retrieve the details of all the completed shipments a given customer has made.
        // NOTE:You will need to ensure that a customer_id can be differentiated from a shipment_id by using a regex expression.
        return null;
    }

    @GetMapping("shipments/{customer_id}/{shipment_id}")
    public ResponseEntity<Shipment> getShipmentByCustomerIdAndShipmentId(@PathVariable("customer_id") Integer customer_id,
                                                         @PathVariable("shipment_id") Integer shipment_id,
                                                         @RequestHeader("Authorization") String jwt){
        if(!jwtUtil.isJwtValid(jwt))
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        Optional<User> user = userRepository.findById(customer_id);
        Optional<Shipment> shipment = shipmentRepository.findShipmentByIdAndUser(shipment_id, user.get());

        if(!shipment.isPresent())
            return new ResponseEntity<>(shipment.get(), HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("shipments/{shipment_id}")
    public ResponseEntity<Shipment> updateAShipmentById(@RequestBody Shipment shipment,@PathVariable("shipment_id") Integer shipment_id, @RequestHeader("Authorization") String jwt){
        if(!sessionUtil.isSessionValid(jwt))
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        if(!(jwtUtil.tokenAccountType(jwt) == AccountType.ADMINISTRATOR)){
            if (shipment.getShipmentStatus() == ShipmentStatus.CANCELLED){
                Optional<Shipment> s = shipmentRepository.findById(shipment_id);
                s.get().setShipmentStatus(shipment.getShipmentStatus());
                shipmentRepository.save(s.get());
                return new ResponseEntity<>(HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        }
        //FORTSÄTT HÄR PÅ MÅNDAG :)


        
        //This endpoint is used to update a shipment, but a non-Administrator user may only cancel a shipment.
        // An administrator can make any changes they wish to a shipment.
        // The administrator will use this to mark a shipment as completed.2.
    return null;
    }

    @DeleteMapping("shipments/{shipment_id}")
    public Shipment deleteShipmentById(@PathVariable("shipment_id") Integer shipment_id, @RequestHeader("Authorization") String jwt){
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

