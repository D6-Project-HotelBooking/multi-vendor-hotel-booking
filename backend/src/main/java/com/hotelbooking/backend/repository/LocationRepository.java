// File: src/main/java/com/hotelbooking/backend/repository/LocationRepository.java
package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    // JpaRepository provides all the basic CRUD methods like save(),
    // findAll(), findById(), deleteById(), etc.
    // We don't need to add any custom methods for now.
}