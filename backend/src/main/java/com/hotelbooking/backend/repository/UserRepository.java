// File: src/main/java/com/hotelbooking/backend/repository/UserRepository.java
package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.model.User;
import com.hotelbooking.backend.model.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Custom query to find a user by their email address
    Optional<User> findByEmail(String email);
    List<User> findByRole(UserRole role); // Add this line

}