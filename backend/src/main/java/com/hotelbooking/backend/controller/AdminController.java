// src/main/java/com/hotelbooking/backend/controller/AdminController.java
package com.hotelbooking.backend.controller;
import com.hotelbooking.backend.dto.hotel.UpdateHotelRequestDto;
import jakarta.validation.Valid;

import com.hotelbooking.backend.dto.auth.RegisterRequest;
import com.hotelbooking.backend.dto.facility.FacilityDto;
import com.hotelbooking.backend.dto.hotel.AddHotelRequestDto;
import com.hotelbooking.backend.dto.hotel.UpdateHotelRequestDto;
import com.hotelbooking.backend.dto.location.LocationDto;
import com.hotelbooking.backend.model.*;
import com.hotelbooking.backend.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestParam;
import com.hotelbooking.backend.service.FileStorageService;
import java.util.Map;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final LocationService locationService;
    private final FacilityService facilityService;
    private final AuthService authService;
    private final HotelService hotelService;
    private final BookingService bookingService;
    private final FileStorageService fileStorageService;


    @Autowired
    public AdminController(LocationService locationService,
                           FacilityService facilityService,
                           AuthService authService,
                           HotelService hotelService,
                           BookingService bookingService,
                           FileStorageService fileStorageService) {
        this.locationService = locationService;
        this.facilityService = facilityService;
        this.authService = authService;
        this.hotelService = hotelService;
        this.bookingService = bookingService;
        this.fileStorageService = fileStorageService;
    }

    // --- User Management Endpoints ---
    @PostMapping("/register-manager")
    @PreAuthorize("hasRole('ROLE_ADMIN')") // Standardized
    public ResponseEntity<User> registerManager(@Valid @RequestBody RegisterRequest registerRequest) {
        User newManager = authService.registerHotelManager(registerRequest);
        return new ResponseEntity<>(newManager, HttpStatus.CREATED);
    }

    @GetMapping("/managers")
    @PreAuthorize("hasRole('ROLE_ADMIN')") // Standardized
    public ResponseEntity<List<User>> getAllManagers() {
        List<User> managers = authService.getAllHotelManagers();
        return ResponseEntity.ok(managers);
    }

    // --- Location Endpoints ---
    @PostMapping("/locations")
    @PreAuthorize("hasRole('ROLE_ADMIN')") // Standardized
    public ResponseEntity<Location> addLocation(@Valid @RequestBody LocationDto locationDto) {
        Location newLocation = locationService.addLocation(locationDto);
        return new ResponseEntity<>(newLocation, HttpStatus.CREATED);
    }

    @GetMapping("/locations")
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> locations = locationService.getAllLocations();
        return ResponseEntity.ok(locations);
    }

    // --- Facility Endpoints ---
    @PostMapping("/facilities")
    @PreAuthorize("hasRole('ROLE_ADMIN')") // Standardized
    public ResponseEntity<Facility> addFacility(@Valid @RequestBody FacilityDto facilityDto) {
        Facility newFacility = facilityService.addFacility(facilityDto);
        return new ResponseEntity<>(newFacility, HttpStatus.CREATED);
    }

    @GetMapping("/facilities")
    public ResponseEntity<List<Facility>> getAllFacilities() {
        List<Facility> facilities = facilityService.getAllFacilities();
        return ResponseEntity.ok(facilities);
    }

    // --- Hotel Endpoints ---
    @PostMapping("/hotels")
    @PreAuthorize("hasRole('ROLE_ADMIN')") // Standardized
    public ResponseEntity<Hotel> addHotel(@Valid @RequestBody AddHotelRequestDto request) {
        Hotel newHotel = hotelService.addHotel(request);
        return new ResponseEntity<>(newHotel, HttpStatus.CREATED);
    }

    // --- Booking Management Endpoint ---
    @GetMapping("/bookings")
    @PreAuthorize("hasRole('ROLE_ADMIN')") // Standardized
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> allBookings = bookingService.getAllBookings();
        return ResponseEntity.ok(allBookings);
    }

    @PostMapping("/files/upload")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        String filename = fileStorageService.save(file);
        return ResponseEntity.ok(Map.of("filename", filename));
    }
    @PutMapping("/hotels/{hotelId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Hotel> updateHotel(@PathVariable Long hotelId, @Valid @RequestBody UpdateHotelRequestDto request) {
        Hotel updatedHotel = hotelService.updateHotel(hotelId, request);
        return ResponseEntity.ok(updatedHotel);
    }

    @PostMapping("/hotels/{hotelId}/facilities/{facilityId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Hotel> addFacilityToHotel(@PathVariable Long hotelId, @PathVariable Long facilityId) {
        Hotel updatedHotel = hotelService.addFacilityToHotel(hotelId, facilityId);
        return ResponseEntity.ok(updatedHotel);
    }

    @DeleteMapping("/hotels/{hotelId}/facilities/{facilityId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Hotel> removeFacilityFromHotel(@PathVariable Long hotelId, @PathVariable Long facilityId) {
        Hotel updatedHotel = hotelService.removeFacilityFromHotel(hotelId, facilityId);
        return ResponseEntity.ok(updatedHotel);
    }


}