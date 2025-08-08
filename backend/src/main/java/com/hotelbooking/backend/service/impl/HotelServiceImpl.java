package com.hotelbooking.backend.service.impl;
import com.hotelbooking.backend.dto.hotel.UpdateHotelRequestDto;
import com.hotelbooking.backend.model.Facility;
import com.hotelbooking.backend.model.Location;

import com.hotelbooking.backend.dto.hotel.AddHotelRequestDto;
import com.hotelbooking.backend.dto.hotel.UpdateHotelRequestDto;
import com.hotelbooking.backend.model.Facility;
import com.hotelbooking.backend.model.Hotel;
import com.hotelbooking.backend.model.Location;
import com.hotelbooking.backend.model.User;
import com.hotelbooking.backend.repository.FacilityRepository;
import com.hotelbooking.backend.repository.HotelRepository;
import com.hotelbooking.backend.repository.LocationRepository;
import com.hotelbooking.backend.repository.UserRepository;
import com.hotelbooking.backend.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class HotelServiceImpl implements HotelService {

    private final HotelRepository hotelRepository;
    private final LocationRepository locationRepository;
    private final UserRepository userRepository;
    private final FacilityRepository facilityRepository;

    @Autowired
    public HotelServiceImpl(HotelRepository hotelRepository, LocationRepository locationRepository, UserRepository userRepository, FacilityRepository facilityRepository) {
        this.hotelRepository = hotelRepository;
        this.locationRepository = locationRepository;
        this.userRepository = userRepository;
        this.facilityRepository = facilityRepository;
    }

    @Override
    public Hotel addHotel(AddHotelRequestDto request) {
        Location location = locationRepository.findById(request.getLocationId())
                .orElseThrow(() -> new RuntimeException("Location not found with id: " + request.getLocationId()));

        User hotelAdmin = userRepository.findById(request.getHotelAdminId())
                .orElseThrow(() -> new RuntimeException("Hotel Manager not found with id: " + request.getHotelAdminId()));

        if (hotelRepository.findByHotelAdminId(hotelAdmin.getId()).isPresent()) {
            throw new RuntimeException("This manager is already assigned to another hotel.");
        }

        Hotel hotel = new Hotel();
        hotel.setName(request.getName());
        hotel.setDescription(request.getDescription());
        hotel.setPricePerDay(request.getPricePerDay());
        hotel.setTotalRoom(request.getTotalRoom());
        hotel.setHotelEmail(request.getHotelEmail());
        hotel.setStreet(request.getStreet());
        hotel.setPincode(request.getPincode());
        hotel.setImage1(request.getImage1());
        hotel.setImage2(request.getImage2());
        hotel.setImage3(request.getImage3());
        hotel.setLocation(location);
        hotel.setHotelAdmin(hotelAdmin);

        return hotelRepository.save(hotel);
    }

    @Override
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    @Override
    public Optional<Hotel> getHotelById(Long hotelId) {
        return hotelRepository.findById(hotelId);
    }

    @Override
    public List<Hotel> getHotelsByLocation(Long locationId) {
        return hotelRepository.findByLocationId(locationId);
    }

    @Override
    public List<Hotel> getHotelsByFacility(Long facilityId) {
        return hotelRepository.findByFacilityId(facilityId);
    }

    @Override
    public Hotel getHotelByManagerEmail(String managerEmail) {
        User manager = userRepository.findByEmail(managerEmail)
                .orElseThrow(() -> new RuntimeException("Manager not found with email: " + managerEmail));

        return hotelRepository.findByHotelAdminId(manager.getId())
                .orElseThrow(() -> new RuntimeException("No hotel assigned to this manager."));
    }
    @Override
    public Hotel updateHotel(Long hotelId, UpdateHotelRequestDto request) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + hotelId));

        Location location = locationRepository.findById(request.getLocationId())
                .orElseThrow(() -> new RuntimeException("Location not found with id: " + request.getLocationId()));

        hotel.setName(request.getName());
        hotel.setDescription(request.getDescription());
        hotel.setPricePerDay(request.getPricePerDay());
        hotel.setTotalRoom(request.getTotalRoom());
        hotel.setHotelEmail(request.getHotelEmail());
        hotel.setStreet(request.getStreet());
        hotel.setPincode(request.getPincode());
        hotel.setLocation(location);

        return hotelRepository.save(hotel);
    }

    @Override
    public Hotel addFacilityToHotel(Long hotelId, Long facilityId) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + hotelId));

        Facility facility = facilityRepository.findById(facilityId)
                .orElseThrow(() -> new RuntimeException("Facility not found with id: " + facilityId));

        hotel.getFacilities().add(facility);
        return hotelRepository.save(hotel);
    }

    @Override
    public Hotel removeFacilityFromHotel(Long hotelId, Long facilityId) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + hotelId));

        Facility facility = facilityRepository.findById(facilityId)
                .orElseThrow(() -> new RuntimeException("Facility not found with id: " + facilityId));

        hotel.getFacilities().remove(facility);
        return hotelRepository.save(hotel);
    }


}