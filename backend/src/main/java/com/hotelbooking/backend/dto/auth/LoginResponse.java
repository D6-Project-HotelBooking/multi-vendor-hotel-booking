// File: src/main/java/com/hotelbooking/backend/dto/auth/LoginResponse.java
package com.hotelbooking.backend.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor // Creates a constructor with all fields
public class LoginResponse {

    private String jwt;
    private String message;
}