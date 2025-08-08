// File: src/main/java/com/hotelbooking/backend/dto/review/ReviewRequestDto.java
package com.hotelbooking.backend.dto.review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReviewRequestDto {

    @NotNull
    private Long hotelId;

    @NotNull
    @Min(1)
    @Max(5)
    private int rating;

    private String comment;
}