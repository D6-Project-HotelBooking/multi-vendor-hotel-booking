// File: src/main/java/com/hotelbooking/backend/repository/BookingRepository.java
package com.hotelbooking.backend.repository;

import com.hotelbooking.backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.hotelbooking.backend.model.enums.BookingStatus; // Import this
import org.springframework.data.jpa.repository.Query; // Import this
import org.springframework.data.repository.query.Param; // Import this
import java.time.LocalDate; // Import this

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    // We will add custom finders here later
    // Spring Data JPA automatically creates the query from the method name
    List<Booking> findByCustomerId(Long customerId);
    // Find all bookings for a specific hotel
    List<Booking> findByHotelId(Long hotelId);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.hotel.id = :hotelId AND " +
            "b.bookingStatus IN (:statuses) AND " +
            "(b.checkInDate < :checkOutDate AND b.checkOutDate > :checkInDate)")
    int countOverlappingBookings(@Param("hotelId") Long hotelId,
                                 @Param("checkInDate") LocalDate checkInDate,
                                 @Param("checkOutDate") LocalDate checkOutDate,
                                 @Param("statuses") List<BookingStatus> statuses);


}