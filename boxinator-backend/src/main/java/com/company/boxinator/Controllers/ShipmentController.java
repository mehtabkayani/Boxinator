package com.company.boxinator.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ShipmentController {
    @GetMapping("/shipment")
    public String index(){
        return "shipment active";
    }
}

