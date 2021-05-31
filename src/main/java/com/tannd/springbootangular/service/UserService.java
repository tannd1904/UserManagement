package com.tannd.springbootangular.service;

import com.tannd.springbootangular.model.User;
import com.tannd.springbootangular.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteByUsername(String username) {
        userRepository.deleteByUsername(username);
    }

    @Override
    public void delete(User user) {
        userRepository.delete(user);
    }

    @Override
    public List<User> getUserByUsername(String username) {
        return userRepository.findUserByUsernameContaining(username);
    }

    @Override
    public List<User> getUserByFirstname(String firstname) {
        return userRepository.findUserByFirstnameContaining(firstname);
    }

    @Override
    public List<User> getUserByLastname(String lastname) {
        return userRepository.findUserByLastnameContaining(lastname);
    }

    @Override
    public List<User> getUserByEmail(String email) {
        return userRepository.findUserByEmailContaining(email);
    }
}
