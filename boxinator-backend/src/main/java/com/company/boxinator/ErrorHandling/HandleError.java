package com.company.boxinator.ErrorHandling;

import com.company.boxinator.Models.Shipment;
import com.company.boxinator.Utils.SessionUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class HandleError {

private SessionUtil sessionUtil;

    public ResponseEntity HandleInvalidJwt(String jwt) {

            return new ResponseEntity<>(sessionUtil.isSessionValid(jwt),HttpStatus.UNAUTHORIZED);
    }
}
