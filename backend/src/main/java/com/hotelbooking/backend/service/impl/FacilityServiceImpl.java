// File: src/main/java/com/hotelbooking/backend/service/impl/FacilityServiceImpl.java
package com.hotelbooking.backend.service.impl;

import com.hotelbooking.backend.dto.facility.FacilityDto;
import com.hotelbooking.backend.model.Facility;
import com.hotelbooking.backend.repository.FacilityRepository;
import com.hotelbooking.backend.service.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FacilityServiceImpl implements FacilityService {

    private final FacilityRepository facilityRepository;

    @Autowired
    public FacilityServiceImpl(FacilityRepository facilityRepository) {
        this.facilityRepository = facilityRepository;
    }

    @Override
    public Facility addFacility(FacilityDto facilityDto) {
        Facility facility = new Facility();
        facility.setName(facilityDto.getName());
        facility.setDescription(facilityDto.getDescription());
        return facilityRepository.save(facility);
    }

    @Override
    public List<Facility> getAllFacilities() {
        return facilityRepository.findAll();
    }
}