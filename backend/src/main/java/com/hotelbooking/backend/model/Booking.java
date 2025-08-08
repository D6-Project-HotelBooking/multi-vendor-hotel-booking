// File: src/main/java/com/hotelbooking/backend/model/Booking.java
package com.hotelbooking.backend.model;

import com.hotelbooking.backend.model.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate checkInDate;

    private LocalDate checkOutDate;

    private int totalDays;

    private double totalPrice;

    @Enumerated(EnumType.STRING)
    private BookingStatus bookingStatus;

    // --- Relationships ---

    // Many bookings can be for one hotel
    @ManyToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    // Many bookings can be made by one customer
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;
}