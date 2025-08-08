// File: src/main/java/com/hotelbooking/backend/service/FacilityService.java
package com.hotelbooking.backend.service;

import com.hotelbooking.backend.dto.facility.FacilityDto;
import com.hotelbooking.backend.model.Facility;
import java.util.List;

public interface FacilityService {
    Facility addFacility(FacilityDto facilityDto);
    List<Facility> getAllFacilities();
}