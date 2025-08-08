// File: src/main/java/com/hotelbooking/backend/service/AuthServiceImpl.java
package com.hotelbooking.backend.service.impl;

import com.hotelbooking.backend.dto.auth.LoginRequest;
import com.hotelbooking.backend.dto.auth.LoginResponse;
import com.hotelbooking.backend.dto.auth.RegisterRequest;
import com.hotelbooking.backend.model.User;
import com.hotelbooking.backend.model.enums.UserRole;
import com.hotelbooking.backend.repository.UserRepository;
import com.hotelbooking.backend.service.AuthService;
import com.hotelbooking.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetails; // Import
import org.springframework.security.core.userdetails.UserDetailsService; // Import

import java.util.List;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager; // NEW
    private final JwtUtil jwtUtil; // NEW
    private final UserDetailsService userDetailsService; // NEW


    @Autowired
    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager, // NEW
                           JwtUtil jwtUtil,
                           UserDetailsService userDetailsService) { // NEW
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager; // NEW
        this.jwtUtil = jwtUtil; // NEW
        this.userDetailsService = userDetailsService; // NEW
    }

    @Override
    public User registerCustomer(RegisterRequest request) {
        // Check if the email is already registered
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email address is already in use.");
        }

        // Create a new User entity
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());

        // Encode the password before saving
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Set the customer role
        user.setRole(UserRole.ROLE_CUSTOMER);

        // Copy remaining fields from the request
        user.setGender(request.getGender());
        user.setContactNo(request.getContactNo());
        user.setAge(request.getAge());
        user.setStreet(request.getStreet());
        user.setCity(request.getCity());
        user.setPincode(request.getPincode());

        // Save the new user to the database
        return userRepository.save(user);
    }

    @Override
    public User registerHotelManager(RegisterRequest request) {
        // Check if the email is already registered
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email address is already in use.");
        }

        // Create a new User entity
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Set the HOTEL_MANAGER role
        user.setRole(UserRole.ROLE_HOTEL_MANAGER);

        // Copy remaining fields
        user.setGender(request.getGender());
        user.setContactNo(request.getContactNo());
        user.setAge(request.getAge());
        user.setStreet(request.getStreet());
        user.setCity(request.getCity());
        user.setPincode(request.getPincode());

        // Save the new user to the database
        return userRepository.save(user);
    }

    // NEW: Implement the login method
    @Override
    public LoginResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Invalid email or password");
        }

        // If authentication is successful, load UserDetails and generate a JWT
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        return new LoginResponse(jwt, "Login Successful");
    }
    @Override
    public List<User> getAllHotelManagers() {
        return userRepository.findByRole(UserRole.ROLE_HOTEL_MANAGER);
    }
}
