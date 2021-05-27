package com.tannd.springbootangular.dto;

import com.tannd.springbootangular.validation.EmailCheck;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class UserDTO {
    @NotBlank(message = "Username is required")
    @NotNull
    private String username;

    @NotBlank(message = "Password is required")
    @NotNull
    private String password;

    @NotBlank(message = "Email is required")
    @NotNull
    @EmailCheck(groups = {Default.class})
    private String email;

    @NotBlank(message = "Firstname is required")
    @NotNull
    private String firstname;

    @NotBlank(message = "Lastname is required")
    @NotNull
    private String lastname;
}
