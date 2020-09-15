package com.company.boxinator;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.Keys;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.jsonwebtoken.Jwts;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.Random;

@SpringBootApplication
public class BoxinatorApplication {

    public static void main(String[] args) {
        SpringApplication.run(BoxinatorApplication.class, args);


//        Instant now = Instant.now();
//        byte[] secret = Base64.getDecoder().decode("40YCSVTo3Py1lDQtYy5NMwer+/7XqlZCcAMrY4D7ZuI=");
//        String jwt = Jwts.builder()
//
//                .setSubject("Kalle@gmail.com")
//                .setAudience("Video demo")
//                .claim("1d20",new Random().nextInt(20)+1)
//                .setIssuedAt(Date.from(now))
//                .setExpiration(Date.from(now.plus(1, ChronoUnit.MINUTES)))
//                .signWith(Keys.hmacShaKeyFor(secret))
//                .compact();
//
//        System.out.println(jwt);
//
//        //Parse
//
//        Jws<Claims> result = Jwts.parser()
//                .requireAudience("Video demo")
//                .setSigningKey(Keys.hmacShaKeyFor(secret))
//                .parseClaimsJws(jwt);
//        System.out.println(result);
//        System.out.println("1d20: " + result.getBody().get("1d20", Integer.class));



    }
}
