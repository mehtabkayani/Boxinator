package com.company.boxinator.Controllers;

import com.company.boxinator.Models.Country;
import com.company.boxinator.Models.Enums.ShipmentStatus;
import com.company.boxinator.Models.Session;
import com.company.boxinator.Models.Shipment;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;


//@RunWith(SpringRunner.class)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@WebMvcTest
//@AutoConfigureMockMvc
//@WebMvcTest(UserController.class)
class ShipmentControllerTest {


    @InjectMocks
    private ShipmentController shipmentController;

    private RestTemplate restTemplate = new RestTemplate();
    private JSONObject jsonObject;
    private JSONObject countryObject;
    private JSONObject shipmentObject;
    private JSONObject userObject;
    private Session session;
    @BeforeEach
    public void setUp() throws Exception {
        jsonObject = new JSONObject();
        jsonObject.put("email", "mehtab.kayani@gmail.com");
        jsonObject.put("password", "password");
        String code = "957190";
        String baseUrl = "http://localhost:8080/api/login";
        URI uri = new URI(baseUrl);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", code);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<String>(jsonObject.toString(), httpHeaders);
        ResponseEntity<Session> resSession = restTemplate.postForEntity(uri, request, Session.class);
        session = resSession.getBody();
    }

    @Test
    public void updateAShipmentById() throws URISyntaxException, JSONException {
        HttpHeaders httpHeaders = getTokenHeader();
        countryObject = new JSONObject();
        countryObject.put("id","1");
        countryObject.put("countryName", "Sweden");
        countryObject.put("countryCode", "SE");
        countryObject.put("multiplyerNumber", "1");
        userObject = new JSONObject();
        userObject.put("id","58");

        shipmentObject = new JSONObject();
        shipmentObject.put("receiverName", "David");
        shipmentObject.put("boxcolor","#050505" );
        shipmentObject.put("weight", "23");
        shipmentObject.put("shipmentStatus", "CREATED");
        shipmentObject.put("user", userObject);
        shipmentObject.put("country", countryObject);
        HttpEntity<String> request = new HttpEntity<>(shipmentObject.toString(), httpHeaders);
        String url = "http://localhost:8080/api/shipments/118";
        URI uri = new URI(url);

        ResponseEntity<Shipment> shipment = restTemplate.exchange(uri, HttpMethod.PUT, request, Shipment.class);
        System.out.println("Edit Shipment:");

        assertEquals(shipment.getStatusCode(), HttpStatus.OK);

    }

    @Test
    public void addShipment() throws URISyntaxException, JSONException {
        HttpHeaders httpHeaders = getTokenHeader();
        countryObject = new JSONObject();
        countryObject.put("id","1");
        countryObject.put("countryName", "Sweden");
        countryObject.put("countryCode", "SE");
        countryObject.put("multiplyerNumber", "1");
        userObject = new JSONObject();
        userObject.put("id","58");

        shipmentObject = new JSONObject();
        shipmentObject.put("receiverName", "David");
        shipmentObject.put("boxcolor","#050505" );
        shipmentObject.put("weight", "23");
        shipmentObject.put("shipmentStatus", "CREATED");
        shipmentObject.put("user", userObject);
        shipmentObject.put("country", countryObject);
        HttpEntity<String> request = new HttpEntity<>(shipmentObject.toString(), httpHeaders);
        String url = "http://localhost:8080/api/shipment";
        URI uri = new URI(url);

        ResponseEntity<String> shipment = restTemplate.postForEntity(uri, request, String.class);
        System.out.println("Add Shipment:");

        assertEquals(shipment.getStatusCode(), HttpStatus.CREATED);

    }
    @Ignore
//    @Test
    public void deleteShipmentById() throws URISyntaxException {
        HttpHeaders httpHeaders = getTokenHeader();
        String url = "http://localhost:8080/api/shipments/99";
//        URI uri = new URI(url);
        ResponseEntity<Shipment> shipment = restTemplate.exchange(url, HttpMethod.DELETE, new HttpEntity<>(httpHeaders), Shipment.class);
        System.out.println("Deleted Shipment By ID:");

        assertEquals(shipment.getStatusCode(), HttpStatus.OK);

    }

    @Test
    public void getShipmentByCustomerIdAndShipmentId() throws URISyntaxException {
        HttpHeaders httpHeaders = getTokenHeader();
        String url = "http://localhost:8080/api/shipments/75/113";
//        URI uri = new URI(url);
        ResponseEntity<Shipment> shipment = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(httpHeaders), Shipment.class);
        System.out.println("Get Shipment By Customer ID And By Shipment ID:");


            System.out.println(shipment.getBody().getId() + " " + shipment.getBody().getShipmentStatus());


        assertNotNull(shipment.getBody());
        assertEquals(shipment.getStatusCode(), HttpStatus.OK);

    }

    @Test
    public void getAllCompletedShipmentsByCustomerId() throws URISyntaxException {
        HttpHeaders httpHeaders = getTokenHeader();
        String url = "http://localhost:8080/api/shipments/customer/complete/58";
//        URI uri = new URI(url);
        ResponseEntity<Shipment[]> shipments = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(httpHeaders), Shipment[].class);
        System.out.println("All Completed Shipments By User ID:");

        for (Shipment shipment: shipments.getBody()) {
            System.out.println(shipment.getId() + " " + shipment.getShipmentStatus());
        }

        assertNotNull(shipments.getBody());
        assertEquals(shipments.getStatusCode(), HttpStatus.OK);

    }

    @Test
    public void getShipmentsUserById() throws URISyntaxException {
        HttpHeaders httpHeaders = getTokenHeader();
        String url = "http://localhost:8080/api/shipments/customer/58";
//        URI uri = new URI(url);
        ResponseEntity<Shipment[]> shipments = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(httpHeaders), Shipment[].class);
        System.out.println("All Shipments By User ID:");

        for (Shipment shipment: shipments.getBody()) {
            System.out.println(shipment.getId() + " " + shipment.getShipmentStatus());
        }

        assertNotNull(shipments.getBody());
        assertEquals(shipments.getStatusCode(), HttpStatus.OK);

    }

    @Test
    public void getOneCompletedShipmentById() throws URISyntaxException {
        HttpHeaders httpHeaders = getTokenHeader();
        String url = "http://localhost:8080/api/shipments/106";
//        URI uri = new URI(url);
        ResponseEntity<Shipment> shipment = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(httpHeaders), Shipment.class);
        System.out.println("Completed Shipment By ID:");

        System.out.print(shipment.getBody().getId());
        System.out.print(" " + shipment.getBody().getShipmentStatus());

        assertNotNull(shipment.getBody());
        assertEquals(shipment.getStatusCode(), HttpStatus.OK);

    }

    @Test
    public void getShipmentByShipmentId() throws URISyntaxException {
        HttpHeaders httpHeaders = getTokenHeader();
        String url = "http://localhost:8080/api/shipments/113";
//        URI uri = new URI(url);
        ResponseEntity<Shipment> shipment = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(httpHeaders), Shipment.class);
        System.out.println("SHIPMENT BY ID:");

            System.out.println(shipment.getBody().getId());

        assertNotNull(shipment.getBody());
        assertEquals(shipment.getStatusCode(), HttpStatus.OK);

    }

    @Test
    public void getCancelledShipments() throws URISyntaxException {
        HttpHeaders httpHeaders = getTokenHeader();
        String url = "http://localhost:8080/api/shipments/cancelled";
//        URI uri = new URI(url);
        ResponseEntity<Shipment[]> shipments = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(httpHeaders), Shipment[].class);
        System.out.println("Cancelled SHIPMENTS:");
        for (Shipment shipment: shipments.getBody()) {
            System.out.println(shipment.getId() + " " + shipment.getShipmentStatus());
        }
        assertNotNull(shipments.getBody());
        assertEquals(shipments.getStatusCode(), HttpStatus.OK);

    }

    @Test
    public void getIntransitShipments() throws URISyntaxException {
        HttpHeaders httpHeaders = getTokenHeader();
        String url = "http://localhost:8080/api/shipments/intransit";
//        URI uri = new URI(url);
        ResponseEntity<Shipment[]> shipments = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(httpHeaders), Shipment[].class);
        System.out.println("Intransit SHIPMENTS:");
        for (Shipment shipment: shipments.getBody()) {
            System.out.println(shipment.getId() + " " + shipment.getShipmentStatus());
        }
        assertNotNull(shipments.getBody());
        assertEquals(shipments.getStatusCode(), HttpStatus.OK);

    }

    @Test
    public void getReceivedShipments() throws URISyntaxException {
        HttpHeaders httpHeaders = getTokenHeader();
        String url = "http://localhost:8080/api/shipments/received";
//        URI uri = new URI(url);
        ResponseEntity<Shipment[]> shipments = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(httpHeaders), Shipment[].class);
            System.out.println("Received SHIPMENTS:");
        for (Shipment shipment: shipments.getBody()) {
            System.out.println(shipment.getId() + " " + shipment.getShipmentStatus());
        }
        assertNotNull(shipments.getBody());
        assertEquals(shipments.getStatusCode(), HttpStatus.OK);

    }

    @Test
    public void getCreatedShipments() throws URISyntaxException {
        HttpHeaders httpHeaders = getTokenHeader();
        String url = "http://localhost:8080/api/shipments/created";
//        URI uri = new URI(url);
        ResponseEntity<Shipment[]> shipments = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(httpHeaders), Shipment[].class);
            System.out.println("Created SHIPMENTS:");
        for (Shipment shipment: shipments.getBody()) {

            System.out.println(shipment.getId() + " " + shipment.getShipmentStatus());
        }
        assertNotNull(shipments.getBody());
        assertEquals(shipments.getStatusCode(), HttpStatus.OK);

    }

    @Test
    public void getCompletedShipments() throws URISyntaxException {
        HttpHeaders httpHeaders = getTokenHeader();
        String url = "http://localhost:8080/api/shipments/complete";
//        URI uri = new URI(url);
        ResponseEntity<Shipment[]> shipments = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(httpHeaders), Shipment[].class);
            System.out.println("Completed SHIPMENTS:");
        for (Shipment shipment: shipments.getBody()) {

            System.out.println(shipment.getId() + " " + shipment.getShipmentStatus());
        }
        assertNotNull(shipments.getBody());
        assertEquals(shipments.getStatusCode(), HttpStatus.OK);

    }

    @Test
    public void getShipments() throws URISyntaxException {
        HttpHeaders httpHeaders = getTokenHeader();
        String url = "http://localhost:8080/api/shipments";
        URI uri = new URI(url);
        ResponseEntity<Shipment[]> shipments = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(httpHeaders), Shipment[].class);
            System.out.println("All SHIPMENTS:");
        for (Shipment shipment: shipments.getBody()) {
            System.out.println(shipment.getId());
            System.out.println(shipment.getShipmentStatus());

        }
        assertNotNull(shipments.getBody());
        assertEquals(shipments.getStatusCode(), HttpStatus.OK);
    }


    private HttpHeaders getTokenHeader(){
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", session.getToken());
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return httpHeaders;
    }

}