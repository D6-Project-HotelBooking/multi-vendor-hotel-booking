// File: src/main/java/com/hotelbooking/backend/dto/booking/BookingRequestDto.java
package com.hotelbooking.backend.dto.booking;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
public class BookingRequestDto {

    @NotNull
    private Long hotelId;

    @NotNull
    @Future(message = "Check-in date must be in the future")
    private LocalDate checkInDate;

    @NotNull
    @Future(message = "Check-out date must be in the future")
    private LocalDate checkOutDate;
}