package com.tannd.springbootangular.model;

import com.tannd.springbootangular.validation.EmailCheck;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.io.Serializable;

@Getter
@Setter
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "User")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "username", nullable = false)
    private String username;

    @NotNull
    @NotBlank(message = "Password is required")
    @Column(name = "password", nullable = false)
    private String password;

    @NotNull
    @NotBlank(message = "Firstname is required")
    @Column(name = "firstname", nullable = false)
    private String firstname;

    @NotNull
    @NotBlank(message = "Lastname is required")
    @Column(name = "lastname", nullable = false)
    private String lastname;

    @NotNull
    @NotBlank(message = "Email is required")
    @EmailCheck(groups = {Default.class})
    @Column(name = "email", nullable = false)
    private String email;
}
