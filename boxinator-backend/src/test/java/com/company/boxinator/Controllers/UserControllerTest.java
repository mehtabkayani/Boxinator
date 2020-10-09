package com.company.boxinator.Controllers;

import com.company.boxinator.Models.Session;
import com.company.boxinator.Models.User;
import net.minidev.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import javax.servlet.http.HttpServletRequest;
import java.net.URISyntaxException;
import java.net.URI;

import static org.junit.jupiter.api.Assertions.*;

public class UserControllerTest {

    private RestTemplate restTemplate = new RestTemplate();

    private JSONObject jsonObject;

    private Session session;

//    private HttpServletRequest httpServletRequest;

    @BeforeEach
    public void setUp() throws Exception {
        jsonObject = new JSONObject();
        jsonObject.put("email", "stjernqvist.david@gmail.com");
        jsonObject.put("password", "password");

        String code = "757414";

        URI uri = getUri("/login");

        HttpHeaders httpHeaders = getJsonContentTypeHeader();
        httpHeaders.set("Authorization", code);

        HttpEntity<String> request = new HttpEntity<String>(jsonObject.toString(), httpHeaders);

        ResponseEntity<Session> resSession = restTemplate.postForEntity(uri, request, Session.class);
        session = resSession.getBody();
    }

    @Test
    public void login() throws Exception {
        assertNotNull(session.getToken());
    }

    @Test
    public void getUsers() throws URISyntaxException {
        ResponseEntity<User[]> users = userListRequest(getUri("/users"), getTokenHeader());
        assertNotNull(users);
    }


    @Test
    public void getUserById() throws URISyntaxException {
        ResponseEntity<User> user = userRequest(getUri("/user/"+session.getAccount_id()), HttpMethod.GET, new HttpEntity(getTokenHeader()));
        assertTrue(user.getStatusCode() == HttpStatus.OK);
    }

    @Test
    public void updateUserById() throws URISyntaxException{
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("email", "stjernqvist.david@gmail.com");
        jsonObject.put("firstname", "Davidssss");
        jsonObject.put("lastname", "Stjernqvist");
        jsonObject.put("contactNumber", "0761332431");
        jsonObject.put("countryOfResidence", "Sweden");
        jsonObject.put("dateOfBirth", "1998-01-22");
        jsonObject.put("zipcode", "11354");
        jsonObject.put("accountType", "ADMINISTRATOR");
        jsonObject.put("password", "password");

        HttpEntity<String> request = new HttpEntity<String>(jsonObject.toString(), getTokenHeader());

        ResponseEntity<User> user = userRequest(getUri("/user/"+session.getAccount_id()), HttpMethod.PUT, request);
        assertTrue(user.getStatusCode() == HttpStatus.OK);
    }

    @Test
    public void addUser() throws URISyntaxException {
        jsonObject = new JSONObject();
        jsonObject.put("email", "david.stjernqvist@se.experis.com");
        jsonObject.put("password", "password");
        jsonObject.put("firstname", "David");
        jsonObject.put("lastname", "Stjernqvist");
        jsonObject.put("zipcode", "11354");
        jsonObject.put("contactNumber", "0761332431");
        HttpHeaders httpHeaders = getJsonContentTypeHeader();
        HttpEntity<String> request = new HttpEntity<String>(jsonObject.toString(), httpHeaders);

        ResponseEntity<String> user = restTemplate.postForEntity(getUri("/user"), request, String.class);
        assertTrue(user.getStatusCode() == HttpStatus.CREATED);
    }

//    @Test
//    public void deleteUser() throws URISyntaxException{
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setContentType(MediaType.ALL);
//
//        httpServletRequest = new HttpServletRequestWrapper(new MockHttpServletRequest());
//
//        User emailUser = new User();
//        emailUser.setEmail("david.stjernqvist@se.experis.com");
////        JSONObject jsonObject = new JSONObject();
//        httpServletRequest.setAttribute("data", emailUser.getEmail());
//
//        HttpEntity<String> request = new HttpEntity(httpServletRequest, httpHeaders);
//
////        restTemplate.headForHeaders("http://localhost:8080/api/user", httpServletRequest, httpHeaders);
//
//        ResponseEntity<User> user = restTemplate.exchange(getUri("/user"), HttpMethod.DELETE, request, User.class);
//        assertTrue(user.getStatusCode() == HttpStatus.OK);
//    }

    @Test
    public void logout() throws URISyntaxException{
        HttpHeaders httpHeaders = getTokenHeader();
        URI uri = getUri("/logout");
        ResponseEntity<String> res = restTemplate.exchange(uri, HttpMethod.POST, new HttpEntity<>(httpHeaders), String.class);
        assertTrue(res.getStatusCode() == HttpStatus.OK);
    }

    private HttpHeaders getTokenHeader(){
        HttpHeaders httpHeaders = getJsonContentTypeHeader();
        httpHeaders.set("Authorization", session.getToken());
        return httpHeaders;
    }
    private URI getUri(String url) throws URISyntaxException {
        return new URI("http://localhost:8080/api"+url);
    }
    private ResponseEntity<User> userRequest(URI uri, HttpMethod httpMethod, HttpEntity httpEntity){
        return restTemplate.exchange(uri, httpMethod, httpEntity, User.class);
    }

    private ResponseEntity<User[]> userListRequest(URI uri, HttpHeaders httpHeaders){
        return restTemplate.exchange(uri, HttpMethod.GET, new HttpEntity<>(httpHeaders), User[].class);
    }
    private HttpHeaders getJsonContentTypeHeader(){
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return httpHeaders;
    }
}
