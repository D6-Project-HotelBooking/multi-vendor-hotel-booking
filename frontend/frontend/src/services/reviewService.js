    // src/services/reviewService.js
import api from './api';

export const getReviewsByHotelId = (hotelId) => {
    return api.get(`/api/public/reviews/${hotelId}`);
};

export const postReview = (reviewData) => {
    return api.post('/api/customer/reviews', reviewData);
};
