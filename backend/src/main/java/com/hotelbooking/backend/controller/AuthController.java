// File: src/main/java/com/hotelbooking/backend/controller/AuthController.java
package com.hotelbooking.backend.controller;

import com.hotelbooking.backend.dto.auth.LoginRequest;
import com.hotelbooking.backend.dto.auth.LoginResponse;
import com.hotelbooking.backend.dto.auth.RegisterRequest;
import com.hotelbooking.backend.model.User;
import com.hotelbooking.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register-customer")
    public ResponseEntity<User> registerCustomer(@Valid @RequestBody RegisterRequest registerRequest) {
        User newUser = authService.registerCustomer(registerRequest);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    // NEW: Add the login endpoint
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }
}