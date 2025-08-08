// src/main/java/com/hotelbooking/backend/dto/hotel/UpdateHotelRequestDto.java
package com.hotelbooking.backend.dto.hotel;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateHotelRequestDto {
    @NotEmpty
    private String name;
    private String description;
    @NotNull
    private Double pricePerDay;
    @NotNull
    @Min(1)
    private Integer totalRoom;
    private String hotelEmail;
    private String street;
    private String pincode;
    @NotNull
    private Long locationId;

    // --- ADD THESE FIELDS ---
    private String image1;
    private String image2;
    private String image3;
}