// File: src/main/java/com/hotelbooking/backend/service/impl/LocationServiceImpl.java
package com.hotelbooking.backend.service.impl;

import com.hotelbooking.backend.dto.location.LocationDto;
import com.hotelbooking.backend.model.Location;
import com.hotelbooking.backend.repository.LocationRepository;
import com.hotelbooking.backend.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LocationServiceImpl implements LocationService {

    private final LocationRepository locationRepository;

    @Autowired
    public LocationServiceImpl(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Override
    public Location addLocation(LocationDto locationDto) {
        Location location = new Location();
        location.setCity(locationDto.getCity());
        location.setDescription(locationDto.getDescription());
        return locationRepository.save(location);
    }

    @Override
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }
}