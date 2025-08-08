// File: src/main/java/com/hotelbooking/backend/model/User.java
package com.hotelbooking.backend.model;

import com.hotelbooking.backend.model.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data // Lombok: Generates getters, setters, toString(), etc.
@NoArgsConstructor // Lombok: Generates a no-args constructor
@AllArgsConstructor // Lombok: Generates a constructor with all args
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String gender;

    private String contactNo;

    private int age;

    private String street;

    private String city;

    private String pincode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;
}