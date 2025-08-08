// File: src/main/java/com/hotelbooking/backend/service/AuthService.java
package com.hotelbooking.backend.service;

import com.hotelbooking.backend.dto.auth.LoginRequest;
import com.hotelbooking.backend.dto.auth.LoginResponse;
import com.hotelbooking.backend.dto.auth.RegisterRequest;
import com.hotelbooking.backend.model.User;

import java.util.List;


public interface AuthService {
    User registerCustomer(RegisterRequest request);
    LoginResponse login(LoginRequest request);
    User registerHotelManager(RegisterRequest request);
    List<User> getAllHotelManagers(); // Add this line
}