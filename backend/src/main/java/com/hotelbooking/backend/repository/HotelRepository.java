// File: src/main/java/com/hotelbooking/backend/repository/HotelRepository.java
package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional; // Import this


@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    // Find the hotel managed by a specific user (by the user's ID)
    Optional<Hotel> findByHotelAdminId(Long managerId);
    // Find all hotels associated with a specific location ID
    List<Hotel> findByLocationId(Long locationId);

    // Add this custom query
    @Query("SELECT h FROM Hotel h JOIN h.facilities f WHERE f.id = :facilityId")
    List<Hotel> findByFacilityId(@Param("facilityId") Long facilityId);
}