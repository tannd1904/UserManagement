package com.tannd.springbootangular.controller;

import com.tannd.springbootangular.SpringbootAngularApplication;
import com.tannd.springbootangular.dto.UserDTO;
import com.tannd.springbootangular.encoder.Encoder;
import com.tannd.springbootangular.mapper.UserMapper;
import com.tannd.springbootangular.model.User;
import com.tannd.springbootangular.model.UserInfo;
import com.tannd.springbootangular.service.EmailService;
import com.tannd.springbootangular.service.UserService;
import freemarker.template.TemplateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.mail.MessagingException;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.net.URI;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    private static Logger log = LoggerFactory.getLogger(SpringbootAngularApplication.class);

    @GetMapping(value = "/users")
    List<User> getAll() {
        return userService.getAllUsers();
    }

    @GetMapping(value = "/user/{username}")
    ResponseEntity<User> getByUsername(@PathVariable("username") @NotNull String username) {
        User user = userService.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User Not Found!");
        }
        return ResponseEntity.ok().body(user);
    }

    @PostMapping(value = "/user")
    ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO) throws MessagingException, IOException, TemplateException {
        User temp = userService.findByUsername(userDTO.getUsername());
        if (temp != null) {
            throw new RuntimeException("Username Has Already Registered");
        }
        @Valid
        User user = UserMapper.DtoToEntity(userDTO);
        Encoder encoder = new Encoder();
        user.setPassword(encoder.sha256(userDTO.getPassword()));
        User added = userService.save(user);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{username}").buildAndExpand(added.getUsername()).toUri();

        log.info("START... Sending Email");
        UserInfo userInfo = new UserInfo(added.getUsername(), added.getFirstname(), added.getEmail());
        emailService.sendEmail(userInfo);
        log.info("END...Email sent success");

        return ResponseEntity.ok().body("User added successfully");
    }

    @PutMapping(value = "/user/{username}")
    ResponseEntity<User> updateUser(@PathVariable("username") @NotNull String username,
                                          @Valid @RequestBody UserDTO userDTO) {
        System.out.println(username);
        User user = userService.findByUsername(username);
        @Valid
        User newUser = UserMapper.DtoToEntity(userDTO);
        userService.save(newUser);
        return ResponseEntity.ok().body(newUser);
    }

    @DeleteMapping(value = "/user/{username}")
    ResponseEntity<?> deleteUser(@PathVariable("username") @NotNull String username) {
        System.out.println("Delete worked with user name " + username);
        User user = userService.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User Not Found");
        }
        System.out.println("aaa");
        userService.delete(user);
        System.out.println("bbb");
        return ResponseEntity.ok().body("User deleted with success");
    }

    @GetMapping(value = "/get-user-by/Username/{username}")
    ResponseEntity<?> getUserByUsername(@PathVariable("username") @NotNull String username) {
        System.out.println("Get user by username: " + username);
        List<User> users = userService.getUserByUsername(username);
        return ResponseEntity.ok().body(users);
    }

    @GetMapping(value = "/get-user-by/Firstname/{firstname}")
    ResponseEntity<?> getUserByFirstname(@PathVariable("firstname") @NotNull String firstname) {
        List<User> users = userService.getUserByFirstname(firstname);
        return ResponseEntity.ok().body(users);
    }

    @GetMapping(value = "/get-user-by/Lastname/{lastname}")
    ResponseEntity<?> getUserByLastname(@PathVariable("lastname") @NotNull String lastname) {
        List<User> users = userService.getUserByLastname(lastname);
        return ResponseEntity.ok().body(users);
    }

    @GetMapping(value = "/get-user-by/Email/{email}")
    ResponseEntity<?> getUserByEmail(@PathVariable("email") @NotNull String email) {
        List<User> users = userService.getUserByEmail(email);
        return ResponseEntity.ok().body(users);
    }

}
