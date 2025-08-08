// File: src/main/java/com/hotelbooking/backend/repository/FacilityRepository.java
package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.model.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, Long> {
}