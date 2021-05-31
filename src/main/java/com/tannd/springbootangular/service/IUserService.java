package com.tannd.springbootangular.service;

import com.tannd.springbootangular.model.User;

import java.util.List;

public interface IUserService {
    List<User> getAllUsers();
    User findByUsername(String username);
    User save(User user);
    void deleteByUsername(String delete);
    void delete(User user);
    List<User> getUserByUsername(String username);
    List<User> getUserByFirstname(String firstname);
    List<User> getUserByLastname(String lastname);
    List<User> getUserByEmail(String email);

}
