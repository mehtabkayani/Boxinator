package com.company.boxinator.Controllers;

import static org.junit.jupiter.api.Assertions.*;
import com.company.boxinator.Controllers.CountryController;
import com.company.boxinator.Models.Country;
import com.company.boxinator.Repositories.CountryRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

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
    private CountryRepository countryRepository;



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


}