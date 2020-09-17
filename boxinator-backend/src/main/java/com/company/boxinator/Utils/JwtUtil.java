package com.company.boxinator.Utils;

import com.company.boxinator.Models.Enums.AccountType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.Random;

public class JwtUtil {
    private byte[] secret = Base64.getDecoder().decode("WleI8EAlaHxOy4rOEPc46vKjvHV6vCxchLxDyoFS0b8=");
    private Instant instant = Instant.now();

    //Recieves the email of the user and sets the audience according the accountype
    public String createJWT(String email, AccountType accountType){
        return Jwts.builder()
                .setSubject(email)
                .setAudience(accountType.toString())
                .claim("ld20", new Random().nextInt(20) + 1)
                .setIssuedAt(Date.from(instant))
                .setExpiration(Date.from(instant.minus(1, ChronoUnit.HOURS)))
                .signWith(Keys.hmacShaKeyFor(secret))
                .compact();
    }
    //50000 is only for development purpose, amount of seconds allowed
    public Jws<Claims> parseJWT(String jwt, AccountType accountType){
        return Jwts.parser()
                .requireAudience(accountType.toString())
                .setAllowedClockSkewSeconds(50000)
                .setSigningKey(Keys.hmacShaKeyFor(secret))
                .parseClaimsJws(jwt);
    }
}
