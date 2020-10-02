package com.company.boxinator.Controllers;

import com.company.boxinator.Config.SecurityConf;
import com.company.boxinator.ErrorHandling.HandleError;
import com.company.boxinator.Models.Country;
import com.company.boxinator.Models.Enums.AccountType;
import com.company.boxinator.Models.Enums.ShipmentStatus;
import com.company.boxinator.Models.Shipment;
import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.CountryRepository;
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
    @Autowired
    CountryRepository countryRepository;

    private SessionUtil sessionUtil = SessionUtil.getInstance();

    private ShipmentUtil shipmentUtil = new ShipmentUtil();

    private JwtUtil jwtUtil = new JwtUtil();

    private HandleError handleError;

    private SecurityConf securityConf = new SecurityConf();

    @GetMapping("/shipments")
    public ResponseEntity<List<Shipment>> getAllShipments(@RequestHeader("Authorization") String jwt) {
        List<Shipment> listOfShipments = shipmentRepository.findAll();

        //ADMIN
        String accountType = jwtUtil.parseJWT(jwt).toString();
        if (sessionUtil.isSessionValid(jwt) && jwtUtil.tokenAccountType(jwt) == AccountType.ADMINISTRATOR) {
//            List<Shipment> filteredList = listOfShipments.stream()
//                    .filter(shipment -> (shipment.getShipmentStatus() != ShipmentStatus.CANCELLED) && (shipment.getShipmentStatus() != ShipmentStatus.COMPLETED)).collect(Collectors.toList());
            return new ResponseEntity<>(listOfShipments, HttpStatus.OK);
        }

        //User
        Integer id = jwtUtil.getJwtId(jwt);
        if (sessionUtil.isSessionValid(jwt) && jwtUtil.tokenAccountType(jwt) == AccountType.REGISTERED_USER) {
            List<Shipment> userShippingList = listOfShipments.stream().filter(shipment -> shipment.getUser().getId() == id).collect(Collectors.toList());
            List<Shipment> filteredList = userShippingList.stream().filter(shipment -> shipment.getShipmentStatus() == ShipmentStatus.INTRANSIT || shipment.getShipmentStatus() == ShipmentStatus.COMPLETED).collect(Collectors.toList());

            return new ResponseEntity<>(filteredList, HttpStatus.OK);

        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }


    @GetMapping("shipments/complete")
    public ResponseEntity<List<Shipment>> getCompletedShipments(@RequestHeader("Authorization") String jwt) {
        //Retrieve a list of completed shipments relevant to the authenticated user (as with previous).
        System.out.println(jwt);
        String userT = jwtUtil.parseJWT(jwt).getBody().getId();
        System.out.println(userT);
        if (!sessionUtil.isSessionValid(jwt)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String userId = jwtUtil.parseJWT(jwt).getBody().getId();
        List<Shipment> listOfShipments = shipmentRepository.findAllByUserId(Integer.parseInt(userId)).get();
        List<Shipment> completedShipments = listOfShipments.stream().filter(shipment -> shipment.getShipmentStatus() == ShipmentStatus.COMPLETED).collect(Collectors.toList());
        return new ResponseEntity<>(completedShipments, HttpStatus.OK);
    }

    @GetMapping("shipments/created")
    public ResponseEntity<List<Shipment>> getCreatedShipments(@RequestHeader("Authorization") String jwt) {
        //Retrieve  a  list  of *completed||cancelled?* shipments  relevant  to  the authenticated user (as with previous)
        if (!sessionUtil.isSessionValid(jwt)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String userId = jwtUtil.parseJWT(jwt).getBody().getId();
        List<Shipment> listOfShipments = shipmentRepository.findAllByUserId(Integer.parseInt(userId)).get();
        List<Shipment> createdShipments = listOfShipments.stream().filter(shipment -> shipment.getShipmentStatus() == ShipmentStatus.CREATED).collect(Collectors.toList());
        return new ResponseEntity<>(createdShipments, HttpStatus.OK);
    }

    @GetMapping("shipments/received")
    public ResponseEntity<List<Shipment>> getReceivedShipments(@RequestHeader("Authorization") String jwt) {
        //Retrieve  a  list  of *completed||cancelled?* shipments  relevant  to  the authenticated user (as with previous)
        if (!sessionUtil.isSessionValid(jwt)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String userId = jwtUtil.parseJWT(jwt).getBody().getId();
        List<Shipment> listOfShipments = shipmentRepository.findAllByUserId(Integer.parseInt(userId)).get();
        List<Shipment> receivedShipments = listOfShipments.stream().filter(shipment -> shipment.getShipmentStatus() == ShipmentStatus.RECEIVED).collect(Collectors.toList());
        return new ResponseEntity<>(receivedShipments, HttpStatus.OK);
    }

    @GetMapping("shipments/intransit")
    public ResponseEntity<List<Shipment>> getIntransitShipments(@RequestHeader("Authorization") String jwt) {
        //Retrieve  a  list  of *completed||cancelled?* shipments  relevant  to  the authenticated user (as with previous)
        if (!sessionUtil.isSessionValid(jwt)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String userId = jwtUtil.parseJWT(jwt).getBody().getId();
        List<Shipment> listOfShipments = shipmentRepository.findAllByUserId(Integer.parseInt(userId)).get();
        List<Shipment> intransitShipments = listOfShipments.stream().filter(shipment -> shipment.getShipmentStatus() == ShipmentStatus.INTRANSIT).collect(Collectors.toList());
        return new ResponseEntity<>(intransitShipments, HttpStatus.OK);
    }

    @GetMapping("shipments/cancelled")
    public ResponseEntity<List<Shipment>> getCancelledShipments(@RequestHeader("Authorization") String jwt) {
        //Retrieve  a  list  of *completed||cancelled?* shipments  relevant  to  the authenticated user (as with previous)
        if (!sessionUtil.isSessionValid(jwt)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String userId = jwtUtil.parseJWT(jwt).getBody().getId();
        List<Shipment> listOfShipments = shipmentRepository.findAllByUserId(Integer.parseInt(userId)).get();
        List<Shipment> cancelledShipments = listOfShipments.stream().filter(shipment -> shipment.getShipmentStatus() == ShipmentStatus.CANCELLED).collect(Collectors.toList());
        return new ResponseEntity<>(cancelledShipments, HttpStatus.OK);
    }

    @PostMapping("/shipment")
    public ResponseEntity addShipment(@RequestBody Shipment shipment, @RequestHeader(value = "Authorization", required = false) String jwt) {

        if(!securityConf.validInputs(shipment.getReceiverName(), shipment.getBoxcolor()))
            return new ResponseEntity(HttpStatus.FORBIDDEN);

        if (jwt == null) {
            Optional<Country> country = countryRepository.findById(shipment.getCountry().getId());
            if (!country.isPresent()) {
                return null;
            }
            shipment.setCountry(country.get());
            if (shipment.getUser().getEmail() == null || shipment.getCountry() == null) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("You are missing a email or country");
            }
            if(!securityConf.validInputs(shipment.getUser().getEmail()))
                return new ResponseEntity(HttpStatus.FORBIDDEN);

            Optional<User> userDB = userRepository.findByEmail(shipment.getUser().getEmail());

            if (userDB.isEmpty() || userDB.get().getAccountType() == AccountType.GUEST) {
                if(!securityConf.validInputs(shipment.getBoxcolor(), shipment.getReceiverName()))
                    return new ResponseEntity(HttpStatus.FORBIDDEN);

                User user = shipmentUtil.addGuestUser(shipment);

                if (!userRepository.existsByEmail(user.getEmail())) {
                    userRepository.save(user);
                    shipmentRepository.save(shipmentUtil.setShipment(shipment, user));
                } else {
                    shipmentRepository.save(shipmentUtil.setShipment(shipment, userRepository.findByEmail(shipment.getUser().getEmail()).get()));
                }
                return ResponseEntity.status(HttpStatus.CREATED).body("Your shipment order has been placed!");
            }
        }

        if (!sessionUtil.isSessionValid(jwt)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sign in to place an order!");
        }

        if (shipment.getCountry() == null) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("You are missing a country");
        }

        Integer userId = jwtUtil.getJwtId(jwt);
        User user = userRepository.getOne(userId);
        Optional<Country> country = countryRepository.findById(shipment.getCountry().getId());
        if (!country.isPresent()) {
            return null;
        }
        shipment.setCountry(country.get());

        shipmentRepository.save(shipmentUtil.setShipment(shipment, user));

        return ResponseEntity.status(HttpStatus.CREATED).body(user.getEmail() + " added a new shipment");
    }


    @GetMapping("/shipments/{shipment_id}")
    public ResponseEntity<Shipment> getShipmentByShipmentId(@PathVariable("shipment_id") Integer shipment_id, @RequestHeader("Authorization") String jwt) {
        if (!sessionUtil.isSessionValid(jwt)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Integer userId = jwtUtil.getJwtId(jwt);
        System.out.println(userId);
        Optional<Shipment> shipment = shipmentRepository.findById(shipment_id);
        System.out.println(shipment.get().getUser().getId());


        if(shipment.get().getUser().getId() == userId || jwtUtil.tokenAccountType(jwt) == AccountType.ADMINISTRATOR){
            return new ResponseEntity<>(shipment.get(),HttpStatus.OK);

        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }


    @GetMapping("/shipments/complete/{shipment_id}")
    public ResponseEntity<Shipment> getOneCompletedShipment(@PathVariable("shipment_id") Integer shipment_id, @RequestHeader("Authorization") String jwt) {
        //ADMIN
        //Retrieve the details of a single completed shipment

        String accountType = jwtUtil.parseJWT(jwt).toString();
        System.out.println(accountType);
        System.out.println("Acoount type?: " + AccountType.ADMINISTRATOR);

        if (sessionUtil.isSessionValid(jwt) && jwtUtil.tokenAccountType(jwt) == AccountType.ADMINISTRATOR) {
            Optional<Shipment> shipment = shipmentRepository.findById(shipment_id);
            if (!shipment.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            if (shipment.get().getShipmentStatus() == ShipmentStatus.COMPLETED) {
                return new ResponseEntity<>(shipment.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }

    @GetMapping("/shipments/customer/{customer_id}")
    public List<Shipment> getShipmentsUserById(@PathVariable("customer_id") Integer customer_id, @RequestHeader(value = "Authorization") String jwt) {
        // Retrieve the details of all the shipments a given customer has made.
        List<Shipment> listOfShipments = shipmentRepository.findAll();
        Stream<Shipment> userListOfShipment = listOfShipments.stream().filter(shipment -> shipment.getUser().getId() == customer_id);

        List<Shipment> result = userListOfShipment.map(shipment -> {
            Shipment shipmentDetail = new Shipment();
            shipmentDetail.setId(shipment.getId());
            shipmentDetail.setReceiverName(shipment.getReceiverName());
            shipmentDetail.setWeight(shipment.getWeight());
            shipmentDetail.setBoxcolor(shipment.getBoxcolor());
            shipmentDetail.setCreation_date(shipment.getCreation_date());
            shipmentDetail.setShipmentStatus(shipment.getShipmentStatus());
            shipmentDetail.setShipmentCost(shipment.getShipmentCost());
            shipmentDetail.setUser(shipment.getUser());
            shipmentDetail.setCountry(shipment.getCountry());
            return shipmentDetail;
        }).collect(Collectors.toList());



        return result;

    }


    @GetMapping("/shipments/customer/complete/{customer_id}")
    public ResponseEntity<Shipment> getAllCompletedShipmentsByCustomerId(@PathVariable("customer_id") Integer customer_id, @RequestHeader("Authorization") String jwt) {
        //Admin
        //Retrieve the details of all the completed shipments a given customer has made.
        // NOTE:You will need to ensure that a customer_id can be differentiated from a shipment_id by using a regex expression.
        if (!sessionUtil.isSessionValid(jwt)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Optional<User> user = userRepository.findById(customer_id);
        if (!user.isPresent()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        if (jwtUtil.tokenAccountType(jwt) == AccountType.ADMINISTRATOR) {
            List<Shipment> listOfShipments = shipmentRepository.findAllByUserId(customer_id).get();
            List<Shipment> filteredList = listOfShipments.stream().filter(shipments -> shipments.getShipmentStatus() == ShipmentStatus.COMPLETED).collect(Collectors.toList());

            return new ResponseEntity(filteredList, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }

    @GetMapping("/shipments/{customer_id}/{shipment_id}")
    public ResponseEntity<Shipment> getShipmentByCustomerIdAndShipmentId(@PathVariable("customer_id") Integer customer_id,
                                                                         @PathVariable("shipment_id") Integer shipment_id,
                                                                         @RequestHeader("Authorization") String jwt) {
        //Retrieve the details of a specific shipment made by a specific customer

        if (!sessionUtil.isSessionValid(jwt)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Optional<User> user = userRepository.findById(customer_id);
        if (!user.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (jwtUtil.tokenAccountType(jwt) == AccountType.ADMINISTRATOR) {
            Optional<Shipment> shipment = shipmentRepository.findById(shipment_id);
            if (!shipment.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            if (shipment.get().getUser().getId() == user.get().getId()) {
                return new ResponseEntity(shipment, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }

    @PutMapping("/shipments/{shipment_id}")
    public ResponseEntity<Shipment> updateAShipmentById(@RequestBody Shipment shipment, @PathVariable("shipment_id") Integer shipment_id, @RequestHeader("Authorization") String jwt) {
        if (!sessionUtil.isSessionValid(jwt))
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        Optional<Shipment> oldShipment = shipmentRepository.findById(shipment_id);
        if (!oldShipment.isPresent())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        if ((jwtUtil.tokenAccountType(jwt) == AccountType.REGISTERED_USER)) {
            if (shipment.getShipmentStatus() == ShipmentStatus.CANCELLED) {
                oldShipment.get().setShipmentStatus(shipment.getShipmentStatus());
                shipmentRepository.save(oldShipment.get());
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        }

        Optional<User> user = userRepository.findById(jwtUtil.getJwtId(jwt));

        if (!user.isPresent())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        Optional<Country> country = countryRepository.findById(shipment.getCountry().getId());
        if(!country.isPresent())
            return null;
        shipment.setCountry(country.get());
        System.out.println("Found userid: " + user.get().getId());

        Shipment newShipment = shipmentUtil.updateShipment(shipment, oldShipment.get(), user.get());
        if(!securityConf.validInputs(newShipment.getBoxcolor(), newShipment.getReceiverName()))
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        try {
            shipmentRepository.save(newShipment);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @DeleteMapping("/shipments/{shipment_id}")
    public ResponseEntity<Shipment> deleteShipmentById(@PathVariable("shipment_id") Integer shipment_id, @RequestHeader("Authorization") String jwt) {
        //This  endpoint  is  used  to  delete  a  shipment  only  in  extreme  situations,  and only accessible by an Administrator.
        // (This will also delete completed/cancelled shipments.)

        if (sessionUtil.isSessionValid(jwt) && jwtUtil.tokenAccountType(jwt) == AccountType.ADMINISTRATOR) {
            shipmentRepository.deleteById(shipment_id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }

}