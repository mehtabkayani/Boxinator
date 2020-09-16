package com.company.boxinator.Utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.Random;

public class Jwt {

    public String getToken(String email) {
        System.out.println("In get token");
        String jwt = "";

            Instant now = Instant.now();
            byte[] secret = Base64.getDecoder().decode("40YCSVTo3Py1lDQtYy5NMwer+/7XqlZCcAMrY4D7ZuI=");

            try {
                jwt = Jwts.builder()
                        .setSubject(email)
                        .setAudience("Video demo")
                        .claim("1d20", new Random().nextInt(20) + 1)
                        .setIssuedAt(Date.from(now))
                        .setExpiration(Date.from(now.plus(1, ChronoUnit.MINUTES)))
                        .signWith(Keys.hmacShaKeyFor(secret))
                        .compact();
            } catch (Exception ex){
                jwt = ex.getMessage();
            }


            //Parse
        try{
            Jws<Claims> result = Jwts.parser()
                    .requireAudience("Video demo")
                    .setSigningKey(Keys.hmacShaKeyFor(secret))
                    .parseClaimsJws(jwt);
            System.out.println(result);
            System.out.println("1d20: " + result.getBody().get("1d20", Integer.class));
        }catch (Exception e){
            jwt = e.getMessage();
        }


            return jwt;
    }

    public String parseJwt(String jwt) {

        return "";
    }


}
