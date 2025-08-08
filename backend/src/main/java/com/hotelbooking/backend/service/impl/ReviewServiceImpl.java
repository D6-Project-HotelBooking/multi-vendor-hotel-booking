// File: src/main/java/com/hotelbooking/backend/service/impl/ReviewServiceImpl.java
package com.hotelbooking.backend.service.impl;

import com.hotelbooking.backend.dto.review.ReviewRequestDto;
import com.hotelbooking.backend.model.Hotel;
import com.hotelbooking.backend.model.Review;
import com.hotelbooking.backend.model.User;
import com.hotelbooking.backend.repository.HotelRepository;
import com.hotelbooking.backend.repository.ReviewRepository;
import com.hotelbooking.backend.repository.UserRepository;
import com.hotelbooking.backend.service.ReviewService;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final HotelRepository hotelRepository;
    private final UserRepository userRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository, HotelRepository hotelRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.hotelRepository = hotelRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Review postReview(ReviewRequestDto request, String customerEmail) {
        Hotel hotel = hotelRepository.findById(request.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Review review = new Review();
        review.setHotel(hotel);
        review.setUser(customer);
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setReviewDate(LocalDate.now());

        return reviewRepository.save(review);
    }
    @Override
    public List<Review> getReviewsByHotelId(Long hotelId) {
        return reviewRepository.findByHotelId(hotelId);
    }
}