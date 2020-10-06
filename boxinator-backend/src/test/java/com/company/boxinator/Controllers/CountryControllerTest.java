package com.company.boxinator.Controllers;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.company.boxinator.Controllers.CountryController;
import com.company.boxinator.Models.Country;
import com.company.boxinator.Models.Enums.AccountType;
import com.company.boxinator.Models.Session;
import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.AuthTokenRepository;
import com.company.boxinator.Repositories.CountryRepository;
import com.company.boxinator.Utils.JwtUtil;
import com.company.boxinator.Utils.SessionUtil;
import net.minidev.json.JSONObject;
import org.apache.tomcat.util.http.parser.Authorization;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.*;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.client.RestTemplate;

import java.io.StringReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collections;
import java.util.List;

@RunWith(SpringRunner.class)
@WebMvcTest(CountryController.class)
public class CountryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CountryController countryController;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private CountryRepository countryRepository;

    private RestTemplate restTemplate = new RestTemplate();
    private JSONObject jsonObject;
    private Session session;


    @BeforeEach
    public void setUp() throws Exception {
        jsonObject = new JSONObject();
        jsonObject.put("email", "testToken@gmail.com");
        jsonObject.put("password", "123456");
        String code = "413891";
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
    public void getCountries() throws Exception{
        Country mockCountry = new Country(1, "se", "CountryName", 3);
        List<Country> countries = Collections.singletonList(mockCountry);
        Mockito.when(countryController.getCountries()).thenReturn(countries);

        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/settings/countries").accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        System.out.println(result.getResponse());
        String expected = "[{id:1, countryCode: se, countryName: CountryName, multiplyerNumber: 3}]";
        JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), true);
    }

    Country mockCountry = new Country( 1, "se", "CountryName", 3);
    @Test
    public void getCountryById() throws Exception{

        Mockito.when(countryController.getCountry(Mockito.anyInt())).thenReturn(mockCountry);

        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/settings/country/1").accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        System.out.println(result.getResponse());
        String expected = "{id:1, countryCode: se, countryName: CountryName, multiplyerNumber: 3}";
        JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);
    }
    @Test
    public void addNewCountry() throws Exception{
       //String token = jwtUtil.createJWT(AccountType.ADMINISTRATOR, 1);
       /*User user = new User(1, "test", "test", "marinaT@gmail.com", "password", "20202675", "Sweden", "2233", "0745635", AccountType.ADMINISTRATOR);
        String token = jwtUtil.createJWT(user.getAccountType(), user.getId());
       assertNotNull(token);*/
      //  RequestBuilder requestBuilder1 = MockMvcRequestBuilders.get("/api/login").header("Authorization", token);

        String token = session.getToken();

        Mockito.when(countryRepository.save(Mockito.any(Country.class))).thenReturn(mockCountry);
        RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/settings/countries")
                .header("Authorization", token)
               .accept(MediaType.APPLICATION_JSON)
               .contentType(MediaType.APPLICATION_JSON);
        assertNotNull(token);

        MvcResult result = mockMvc.perform(requestBuilder).andExpect(status().isOk()).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.CREATED.value(), response.getStatus());
        assertEquals("http://localhost/api/settings/countries", response.getHeader(HttpHeaders.LOCATION));
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

    @Test
    public void addCountry() throws URISyntaxException {
        jsonObject = new JSONObject();
        jsonObject.put("countryCode", "se");
        jsonObject.put("countryName", "sweden");
        jsonObject.put("multiplyerNumber", 4);
        HttpHeaders httpHeaders = getTokenHeader();
        HttpEntity<String> request = new HttpEntity<String>(jsonObject.toString(), httpHeaders);
        ResponseEntity<String> country = restTemplate.postForEntity(getUri("/countries"), request, String.class);
        assertTrue(country.getStatusCode() == HttpStatus.OK);


    }

    }