// File: src/main/java/com/hotelbooking/backend/dto/location/LocationDto.java
package com.hotelbooking.backend.dto.location;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class LocationDto {

    @NotEmpty(message = "City name cannot be empty")
    private String city;

    private String description;
}