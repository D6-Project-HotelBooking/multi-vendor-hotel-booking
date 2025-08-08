// File: src/main/java/com/hotelbooking/backend/service/impl/BookingServiceImpl.java
package com.hotelbooking.backend.service.impl;

import com.hotelbooking.backend.dto.booking.BookingRequestDto;
import com.hotelbooking.backend.model.Booking;
import com.hotelbooking.backend.model.Hotel;
import com.hotelbooking.backend.model.User;
import com.hotelbooking.backend.model.enums.BookingStatus;
import com.hotelbooking.backend.repository.BookingRepository;
import com.hotelbooking.backend.repository.HotelRepository;
import com.hotelbooking.backend.repository.UserRepository;
import com.hotelbooking.backend.service.BookingService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final HotelRepository hotelRepository;
    private final UserRepository userRepository;

    public BookingServiceImpl(BookingRepository bookingRepository, HotelRepository hotelRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.hotelRepository = hotelRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public int getAvailableRooms(Long hotelId, LocalDate checkInDate, LocalDate checkOutDate) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        List<BookingStatus> activeStatuses = List.of(BookingStatus.PENDING, BookingStatus.APPROVED);
        int overlappingBookings = bookingRepository.countOverlappingBookings(
                hotelId,
                checkInDate,
                checkOutDate,
                activeStatuses
        );

        int availableRooms = hotel.getTotalRoom() - overlappingBookings;

        // Ensure we don't return a negative number
        return Math.max(0, availableRooms);
    }

}