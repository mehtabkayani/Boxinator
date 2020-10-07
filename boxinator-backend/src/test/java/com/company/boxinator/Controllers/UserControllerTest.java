package com.company.boxinator.Controllers;

import com.company.boxinator.Models.AuthToken;
import com.company.boxinator.Models.BannedAccount;
import com.company.boxinator.Models.Enums.AccountType;
import com.company.boxinator.Models.Session;
import com.company.boxinator.Models.User;
import com.company.boxinator.Repositories.*;
import com.company.boxinator.Services.EmailService;
import com.company.boxinator.Services.FailedSignInService;
import com.company.boxinator.Services.Google2FAService;
import org.aspectj.lang.annotation.Before;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

//    @MockBean
    @MockBean
    private UserRepository userRepository;

    @MockBean
    private AuthTokenRepository authTokenRepository;

    @MockBean
    private ShipmentRepository shipmentRepository;

    @MockBean
    private EmailService emailService;

    @MockBean
    private Google2FAService google2FAService;

    @MockBean
    private CountryRepository countryRepository;
    @MockBean
    private FailedSignInService failedSignInService;
    @MockBean
    private BannedAccountRepository bannedAccountRepository;

    @InjectMocks
    private UserController userController;

    private RestTemplate restTemplate = new RestTemplate();
    private JSONObject jsonObject;
    private JSONObject user1;
    private Session session;

    @BeforeEach
    public void setUp() throws Exception {
        //mockMvc = MockMvcBuilders.standaloneSetup(userController).build();

        jsonObject = new JSONObject();
        jsonObject.put("email", "mehtab.kayani@gmail.com");
        jsonObject.put("password", "password");
        String code = "135708";
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
    public void getUserByIdTest() throws Exception {

        User user = new User();
        user.setId(12);
        user.setFirstname("John");
        user.setLastname("Doe");
        user.setDateOfBirth("2000-09-09");
        user.setZipcode("19535");
        user.setCountryOfResidence("Sweden");
        user.setContactNumber("0734545678");
        user.setAccountType(AccountType.REGISTERED_USER);
        user.setEmail("John@gmail.com");


       // when(userRepository.findById(anyInt()).get()).thenReturn(user);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/12")
                .header("Authorization", session.getToken())
                .accept(MediaType.APPLICATION_JSON)
        )

                .andExpect(MockMvcResultMatchers.jsonPath("$.firstname").value("John"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastname").value("Doe"))
                .andExpect(status().isOk());
    }

//    @Test
//    @WithMockUser(username="ahmed",roles={"ADMIN"})
//    public void shouldGetAllRoundsByUserId() throws Exception {
//    }
//
//    @Test
//    public void existentUserCanGetTokenAndAuthentication() throws Exception {
//        String username = "existentuser";
//        String password = "password";
//
////        String body = "{\"username\":\"" + username + "\", \"password\":\"
////                + password + "\"}";
////
////        MvcResult result = mvc.perform(MockMvcRequestBuilders.post("/token")
////                .content(body))
////                .andExpect(status().isOk()).andReturn();
////
////        String response = result.getResponse().getContentAsString();
////        response = response.replace("{\"access_token\": \"", "");
////        String token = response.replace("\"}", "");
////
////        mvc.perform(MockMvcRequestBuilders.get("/users/" + userId + "/rounds")
////                .header("Authorization", "Bearer " + token))
////                .andExpect(status().isOk());
//    }
}
