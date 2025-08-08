// File: src/main/java/com/hotelbooking/backend/service/LocationService.java
package com.hotelbooking.backend.service;

import com.hotelbooking.backend.dto.location.LocationDto;
import com.hotelbooking.backend.model.Location;
import java.util.List;

public interface LocationService {
    Location addLocation(LocationDto locationDto);
    List<Location> getAllLocations();
}