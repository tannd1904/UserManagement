package com.tannd.springbootangular.mapper;


import com.tannd.springbootangular.dto.UserDTO;
import com.tannd.springbootangular.model.User;

public class UserMapper {
    public static User DtoToEntity(UserDTO stu) {
        return new User().setUsername(stu.getUsername()).setPassword(stu.getPassword())
                .setFirstname(stu.getFirstname()).setLastname(stu.getLastname())
                .setEmail(stu.getEmail());
    }

    public static UserDTO EntityToDto(User user) {
        return new UserDTO().setUsername(user.getUsername()).setPassword(user.getPassword())
                .setFirstname(user.getFirstname()).setLastname(user.getLastname())
                .setEmail(user.getEmail());
    }
}
