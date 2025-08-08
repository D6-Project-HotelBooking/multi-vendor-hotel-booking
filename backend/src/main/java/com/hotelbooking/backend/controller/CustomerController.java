package com.hotelbooking.backend.controller;

import com.hotelbooking.backend.dto.booking.BookingRequestDto;
import com.hotelbooking.backend.dto.review.ReviewRequestDto;
import com.hotelbooking.backend.model.Booking;
import com.hotelbooking.backend.model.Review;
import com.hotelbooking.backend.service.BookingService;
import com.hotelbooking.backend.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    private final BookingService bookingService;
    private final ReviewService reviewService;

    public CustomerController(BookingService bookingService, ReviewService reviewService) {
        this.bookingService = bookingService;
        this.reviewService = reviewService;
    }

    @PostMapping("/bookings")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody BookingRequestDto request, Principal principal) {
        Booking newBooking = bookingService.createBooking(request, principal.getName());
        return new ResponseEntity<>(newBooking, HttpStatus.CREATED);
    }

    @GetMapping("/bookings")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<List<Booking>> getMyBookings(Principal principal) {
        List<Booking> myBookings = bookingService.getBookingsByCustomerEmail(principal.getName());
        return ResponseEntity.ok(myBookings);
    }

    @PostMapping("/reviews")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<Review> postReview(@Valid @RequestBody ReviewRequestDto request, Principal principal) {
        Review newReview = reviewService.postReview(request, principal.getName());
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }
}

