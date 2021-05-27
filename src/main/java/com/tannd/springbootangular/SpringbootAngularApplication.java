package com.tannd.springbootangular;

import com.google.common.hash.Hashing;
import com.tannd.springbootangular.encoder.Encoder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.nio.charset.StandardCharsets;

@SpringBootApplication
public class SpringbootAngularApplication {

    public static void main(String[] args) {
        System.out.println(new Encoder().sha256("admin"));
        SpringApplication.run(SpringbootAngularApplication.class, args);
    }

}
