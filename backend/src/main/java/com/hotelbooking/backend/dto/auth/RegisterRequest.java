// File: src/main/java/com/hotelbooking/backend/dto/auth/RegisterRequest.java
package com.hotelbooking.backend.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data // Lombok: Generates getters, setters, etc.
public class RegisterRequest {

    @NotEmpty(message = "First name cannot be empty")
    private String firstName;

    @NotEmpty(message = "Last name cannot be empty")
    private String lastName;

    @NotEmpty(message = "Email cannot be empty")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotEmpty(message = "Password cannot be empty")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    private String gender;

    private String contactNo;

    private int age;

    private String street;

    private String city;

    private String pincode;
}