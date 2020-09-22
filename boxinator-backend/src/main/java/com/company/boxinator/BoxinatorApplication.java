package com.company.boxinator;

import com.company.boxinator.GoogleAuth2FA.Google2FA;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BoxinatorApplication {

    public static void main(String[] args) {
        SpringApplication.run(BoxinatorApplication.class, args);
        Google2FA google2FA = new Google2FA();
        google2FA.runGoogle2fa();






    }
}
