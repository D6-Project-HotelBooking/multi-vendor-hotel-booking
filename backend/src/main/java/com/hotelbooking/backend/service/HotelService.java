// File: src/main/java/com/hotelbooking/backend/service/HotelService.java
package com.hotelbooking.backend.service;

import com.hotelbooking.backend.dto.hotel.AddHotelRequestDto;
import com.hotelbooking.backend.dto.hotel.UpdateHotelRequestDto;
import com.hotelbooking.backend.model.Hotel;

import java.util.List;
import java.util.Optional;

public interface HotelService {
    Hotel addHotel(AddHotelRequestDto request);
    List<Hotel> getAllHotels(); // Add this
    List<Hotel> getHotelsByLocation(Long locationId); // Add this
    List<Hotel> getHotelsByFacility(Long facilityId); // Add this
    Optional<Hotel> getHotelById(Long hotelId); // Add this
    Hotel getHotelByManagerEmail(String managerEmail); // Add this
}