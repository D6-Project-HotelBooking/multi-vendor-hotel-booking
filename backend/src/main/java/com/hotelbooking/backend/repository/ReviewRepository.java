// File: src/main/java/com/hotelbooking/backend/repository/ReviewRepository.java
package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByHotelId(Long hotelId);
}