package com.hotelbooking.backend.controller;

import com.hotelbooking.backend.model.Booking;
import com.hotelbooking.backend.model.enums.BookingStatus;
import com.hotelbooking.backend.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/manager")
public class HotelManagerController {

    private final BookingService bookingService;

    public HotelManagerController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/bookings")
    @PreAuthorize("hasRole('ROLE_HOTEL_MANAGER')")
    public ResponseEntity<List<Booking>> getHotelBookings(Principal principal) {
        List<Booking> hotelBookings = bookingService.getBookingsByHotel(principal.getName());
        return ResponseEntity.ok(hotelBookings);
    }

    @PatchMapping("/bookings/{bookingId}/status")
    @PreAuthorize("hasRole('ROLE_HOTEL_MANAGER')")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long bookingId,
                                                       @RequestParam BookingStatus status,
                                                       Principal principal) {
        Booking updatedBooking = bookingService.updateBookingStatus(bookingId, status, principal.getName());
        return ResponseEntity.ok(updatedBooking);
    }
}
