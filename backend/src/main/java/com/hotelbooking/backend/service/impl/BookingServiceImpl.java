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
    @Override
    public Booking createBooking(BookingRequestDto request, String customerEmail) {
        Hotel hotel = hotelRepository.findById(request.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        List<BookingStatus> activeStatuses = List.of(BookingStatus.PENDING, BookingStatus.APPROVED);
        int existingBookings = bookingRepository.countOverlappingBookings(
            hotel.getId(),
            request.getCheckInDate(),
            request.getCheckOutDate(),
            activeStatuses
        );

        if (existingBookings >= hotel.getTotalRoom()) {
            throw new RuntimeException("Booking not available for the selected pair of dates. All rooms are booked.");
        }

        long totalDays = ChronoUnit.DAYS.between(request.getCheckInDate(), request.getCheckOutDate());
        if (totalDays <= 0) {
            throw new IllegalArgumentException("Check-out date must be after check-in date.");
        }
        double totalPrice = totalDays * hotel.getPricePerDay();

        Booking booking = new Booking();
        booking.setHotel(hotel);
        booking.setCustomer(customer);
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());
        booking.setTotalDays((int) totalDays);
        booking.setTotalPrice(totalPrice);
        booking.setBookingStatus(BookingStatus.PENDING);

        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getBookingsByCustomerEmail(String customerEmail) {
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return bookingRepository.findByCustomerId(customer.getId());
    }


}