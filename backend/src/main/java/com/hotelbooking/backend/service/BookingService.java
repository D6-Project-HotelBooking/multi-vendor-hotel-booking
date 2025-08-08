// File: src/main/java/com/hotelbooking/backend/service/BookingService.java
package com.hotelbooking.backend.service;

import com.hotelbooking.backend.dto.booking.BookingRequestDto;
import com.hotelbooking.backend.model.Booking;
import com.hotelbooking.backend.model.enums.BookingStatus; // Import this

import java.time.LocalDate;
import java.util.List;

public interface BookingService {
    List<Booking> getAllBookings(); // Add this
    int getAvailableRooms(Long hotelId, LocalDate checkInDate, LocalDate checkOutDate); // Add this
    Booking createBooking(BookingRequestDto request, String customerEmail);
    List<Booking> getBookingsByCustomerEmail(String customerEmail);

}