// src/services/facilityService.js
import api from './api';

export const getAllFacilities = () => {
    return api.get("/api/public/facilities");
};

// Add this new function
export const addFacility = (facilityData) => {
    return api.post("/api/admin/facilities", facilityData);
};