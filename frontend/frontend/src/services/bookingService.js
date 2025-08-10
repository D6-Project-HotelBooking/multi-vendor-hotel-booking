// src/services/bookingService.js
import api from './api';

export const createBooking = (bookingData) => {
    return api.post("/api/customer/bookings", bookingData);
};

export const getMyBookings = () => {
    return api.get("/api/customer/bookings");
};

export const getAllBookings = () => {
    return api.get("/api/admin/bookings");
};

export const getManagerBookings = () => {
    return api.get("/api/manager/bookings");
};

export const updateBookingStatus = (bookingId, status) => {
    return api.patch(`/api/manager/bookings/${bookingId}/status`, null, {
        params: { status }
    });
};

export const checkAvailability = (hotelId, checkInDate, checkOutDate) => {
    return api.get(`/api/public/bookings/availability`, {
        params: { hotelId, checkInDate, checkOutDate }
    });
};
