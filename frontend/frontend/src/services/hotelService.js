import api from './api';

export const getAllHotels = () => {
    return api.get("/api/public/hotels");
};

export const getHotelsByLocation = (locationId) => {
    return api.get(`/api/public/hotels/by-location/${locationId}`);
};

export const getHotelsByFacility = (facilityId) => {
    return api.get(`/api/public/hotels/by-facility/${facilityId}`);
};
