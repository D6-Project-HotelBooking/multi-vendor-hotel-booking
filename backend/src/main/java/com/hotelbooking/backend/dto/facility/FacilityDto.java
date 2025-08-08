// File: src/main/java/com/hotelbooking/backend/dto/facility/FacilityDto.java
package com.hotelbooking.backend.dto.facility;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class FacilityDto {
    @NotEmpty(message = "Facility name cannot be empty")
    private String name;
    private String description;
}