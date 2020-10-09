package com.company.boxinator.Controllers;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.company.boxinator.Models.Country;
import com.company.boxinator.Models.Session;
import com.company.boxinator.Models.Shipment;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import java.net.URI;
import java.net.URISyntaxException;
import static org.junit.jupiter.api.Assertions.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collections;
import java.util.List;



public class CountryControllerTest {

    private RestTemplate restTemplate = new RestTemplate();
    private JSONObject jsonObject;
    private JSONObject countryObject;
    private Session session;

    @BeforeEach
    public void setUp() throws Exception {
        jsonObject = new org.json.JSONObject();
        jsonObject.put("email", "mehtab.kayani@gmail.com");
        jsonObject.put("password", "password");
        String code = "290540";
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
        countryObject.put("countryName", "USA");
        countryObject.put("countryCode", "US");
        countryObject.put("multiplyerNumber", "11");

        HttpEntity<String> request = new HttpEntity<>(countryObject.toString(), httpHeaders);
        URI uri = getUri("/countries/12");


        ResponseEntity<String> country = restTemplate.exchange(uri, HttpMethod.PUT, request, String.class);
        System.out.println("Edit Country:");

        assertEquals(country.getStatusCode(), HttpStatus.OK);

    }
    @Disabled
    @Test
    public void addCountry() throws URISyntaxException, JSONException {

        HttpHeaders httpHeaders = getTokenHeader();
        countryObject = new JSONObject();
        countryObject.put("countryName", "USA");
        countryObject.put("countryCode", "US");
        countryObject.put("multiplyerNumber", "16");

        HttpEntity<String> request = new HttpEntity<>(countryObject.toString(), httpHeaders);
        URI uri = getUri("/countries");

        ResponseEntity<String> shipment = restTemplate.postForEntity(uri, request, String.class);
        System.out.println("Add Country:");

        assertEquals(shipment.getStatusCode(), HttpStatus.CREATED);

    }

    @Test
    public void getCountries() throws Exception{
        HttpHeaders httpHeaders = getTokenHeader();

        URI uri = getUri("/countries");
        ResponseEntity<Country[]> countries = restTemplate.exchange(uri, HttpMethod.GET, new HttpEntity<>(httpHeaders), Country[].class);
        System.out.println("All Countries:");
        for (Country country: countries.getBody()) {
            System.out.println(country.getId());
            System.out.println(country.getCountryName());
            System.out.println(country.getCountryCode());
            System.out.println(country.getMultiplyerNumber());

        }
        assertNotNull(countries.getBody());
        assertEquals(countries.getStatusCode(), HttpStatus.OK);
    }


    @Test
    public void getCountryById() throws Exception{
        HttpHeaders httpHeaders = getTokenHeader();

        URI uri = getUri("/country/5");
        ResponseEntity<Country> country = restTemplate.exchange(uri, HttpMethod.GET, new HttpEntity<>(httpHeaders), Country.class);
        System.out.println("Country by IDs:");

            System.out.println(country.getBody().getId());
            System.out.println(country.getBody().getCountryName());
            System.out.println(country.getBody().getCountryCode());
            System.out.println(country.getBody().getMultiplyerNumber());

        assertNotNull(country.getBody());
        assertEquals(country.getStatusCode(), HttpStatus.OK);

    }


    //..............................................

    private HttpHeaders getTokenHeader(){
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", session.getToken());
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return httpHeaders;
    }

    private URI getUri(String url) throws URISyntaxException {
        return new URI("http://localhost:8080/api/settings"+url);
    }
    private HttpHeaders getJsonContentTypeHeader(){
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return httpHeaders;
    }



    }