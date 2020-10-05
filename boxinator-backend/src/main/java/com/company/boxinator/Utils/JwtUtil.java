package com.company.boxinator.Utils;

import com.company.boxinator.Models.Enums.AccountType;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import net.minidev.json.JSONObject;
import org.springframework.http.HttpStatus;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.Random;

public class JwtUtil {
    private byte[] secret = Base64.getDecoder().decode("WleI8EAlaHxOy4rOEPc46vKjvHV6vCxchLxDyoFS0b8=");
    private Instant instant = Instant.now();

    //Recieves the email of the user and sets the audience according the accountype
    public String createJWT(AccountType accountType, Integer id){
        return Jwts.
                builder()
                .setId(id.toString())
                .setSubject(accountType.toString())
                .setIssuedAt(Date.from(instant))
                .setExpiration(Date.from(instant.minus(1, ChronoUnit.HOURS)))
                .signWith(Keys.hmacShaKeyFor(secret))
                .compact();
    }
    //50000 is only for development purpose, amount of seconds allowed
    public Jws<Claims> parseJWT(String jwt){
        return Jwts.parser()
                .setAllowedClockSkewSeconds(50000)
                .setSigningKey(Keys.hmacShaKeyFor(secret))
                .parseClaimsJws(jwt);
    }
    public boolean isJwtValid(String jwt){
        boolean isValid = false;
        try{
            parseJWT(jwt);
            isValid = true;
        } catch (Exception ex){
        }
        return isValid;
    }

    public AccountType tokenAccountType(String jwt) {
        switch (parseJWT(jwt).getBody().getSubject()) {
            case "ADMINISTRATOR":
                return AccountType.ADMINISTRATOR;
            case "REGISTERED_USER":
                return AccountType.REGISTERED_USER;
            default:
                System.out.println("Default");
                return null;
        }
    }

    public Integer getJwtId(String jwt){
        return Integer.parseInt(parseJWT(jwt).getBody().getId());
    }
}
