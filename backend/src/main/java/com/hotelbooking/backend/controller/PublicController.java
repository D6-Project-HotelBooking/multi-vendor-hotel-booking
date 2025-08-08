// File: src/main/java/com/hotelbooking/backend/controller/PublicController.java
package com.hotelbooking.backend.controller;

import com.hotelbooking.backend.model.Hotel;
import com.hotelbooking.backend.model.Location;
import com.hotelbooking.backend.model.Review;
import com.hotelbooking.backend.service.*;
import com.hotelbooking.backend.model.Facility;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;

import java.time.LocalDate; // Import this
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat; // Import this

@RestController
@RequestMapping("/api/public")
public class PublicController {

    private final ReviewService reviewService;
    private final HotelService hotelService; // NEW
    private final LocationService locationService; // NEW
    private final FacilityService facilityService;
    private final FileStorageService fileStorageService;// NEW
    private final BookingService bookingService; // Add this


    public PublicController(ReviewService reviewService, HotelService hotelService, LocationService locationService, FacilityService facilityService, FileStorageService fileStorageService, BookingService bookingService) { // NEW
        this.reviewService = reviewService;
        this.hotelService = hotelService; // NEW
        this.locationService = locationService; // NEW
        this.facilityService = facilityService;
        this.fileStorageService = fileStorageService;// NEW
        this.bookingService = bookingService;
    }

    // --- Hotel Endpoints ---
    @GetMapping("/hotels")
    public ResponseEntity<List<Hotel>> getAllHotels() {
        List<Hotel> hotels = hotelService.getAllHotels();

        // This tells the browser not to cache this response
        CacheControl cacheControl = CacheControl.noCache().mustRevalidate();

        return ResponseEntity.ok()
                .cacheControl(cacheControl)
                .body(hotels);
    }

    // --- Location Endpoints ---
    @GetMapping("/locations")
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> locations = locationService.getAllLocations();
        return ResponseEntity.ok(locations);
    }

    // --- Review Endpoint ---
    @GetMapping("/reviews/{hotelId}")
    public ResponseEntity<List<Review>> getHotelReviews(@PathVariable Long hotelId) {
        List<Review> reviews = reviewService.getReviewsByHotelId(hotelId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/hotels/by-location/{locationId}")
    public ResponseEntity<List<Hotel>> getHotelsByLocation(@PathVariable Long locationId) {
        List<Hotel> hotels = hotelService.getHotelsByLocation(locationId);
        return ResponseEntity.ok(hotels);
    }
    // --- Facility Endpoint --- NEW
    @GetMapping("/facilities")
    public ResponseEntity<List<Facility>> getAllFacilities() {
        List<Facility> facilities = facilityService.getAllFacilities();
        return ResponseEntity.ok(facilities);
    }

    @GetMapping("/hotels/by-facility/{facilityId}")
    public ResponseEntity<List<Hotel>> getHotelsByFacility(@PathVariable Long facilityId) {
        List<Hotel> hotels = hotelService.getHotelsByFacility(facilityId);
        return ResponseEntity.ok(hotels);
    }

    @GetMapping("/hotels/{hotelId}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long hotelId) {
        return hotelService.getHotelById(hotelId)
                .map(ResponseEntity::ok) // If found, wrap in 200 OK
                .orElse(ResponseEntity.notFound().build()); // If not found, return 404
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = fileStorageService.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @GetMapping("/bookings/availability")
    public ResponseEntity<Map<String, Integer>> getRoomAvailability(
            @RequestParam Long hotelId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate) {

        int availableRooms = bookingService.getAvailableRooms(hotelId, checkInDate, checkOutDate);
        return ResponseEntity.ok(Map.of("availableRooms", availableRooms));
    }
}