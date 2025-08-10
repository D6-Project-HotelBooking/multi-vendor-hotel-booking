// src/services/hotelService.js
import api from './api';

export const getAllHotels = () => { return api.get("/api/public/hotels"); };
export const getHotelsByLocation = (locationId) => { return api.get(`/api/public/hotels/by-location/${locationId}`); };
export const getHotelsByFacility = (facilityId) => { return api.get(`/api/public/hotels/by-facility/${facilityId}`); };
export const getHotelById = (hotelId) => { return api.get(`/api/public/hotels/${hotelId}`); };
export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post("/api/admin/files/upload", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};
export const addHotel = (hotelData) => { return api.post("/api/admin/hotels", hotelData); };
export const updateHotel = (hotelId, hotelData) => { return api.put(`/api/admin/hotels/${hotelId}`, hotelData); };
export const addFacilityToHotel = (hotelId, facilityId) => { return api.post(`/api/admin/hotels/${hotelId}/facilities/${facilityId}`); };
export const removeFacilityFromHotel = (hotelId, facilityId) => { return api.delete(`/api/admin/hotels/${hotelId}/facilities/${facilityId}`); };
// This is the function the page uses
export const getManagerHotel = () => { return api.get("/api/manager/hotel"); };

export const addFacilityToManagerHotel = (facilityId) => {
    return api.post(`/api/manager/hotel/facilities/${facilityId}`);
};

export const removeFacilityFromManagerHotel = (facilityId) => {
    return api.delete(`/api/manager/hotel/facilities/${facilityId}`);
};
