import api from './api';

export const loginUser = (credentials) => {
    return api.post("/api/auth/login", credentials);
};

export const registerCustomer = (userData) => {
    return api.post("/api/auth/register-customer", userData);
};
