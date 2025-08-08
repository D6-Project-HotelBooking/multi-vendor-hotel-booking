// File: src/main/java/com/hotelbooking/backend/service/ReviewService.java
package com.hotelbooking.backend.service;

import com.hotelbooking.backend.dto.review.ReviewRequestDto;
import com.hotelbooking.backend.model.Review;

import java.util.List;

public interface ReviewService {
	Review postReview(ReviewRequestDto request, String customerEmail);
    List<Review> getReviewsByHotelId(Long hotelId); // Add this
}