package com.company.boxinator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
//@ContextConfiguration(locations =  {"classpath*:/spring/test-context.xml"})
public class BoxinatorApplication {

    public static void main(String[] args) {
        SpringApplication.run(BoxinatorApplication.class, args);
    }
}
