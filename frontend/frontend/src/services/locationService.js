// src/services/locationService.js
import api from './api';

export const getAllLocations = () => {
    return api.get("/api/public/locations");
};

// Add this new function
export const addLocation = (locationData) => {
    return api.post("/api/admin/locations", locationData);
};