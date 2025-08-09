import api from './api';

export const loginUser = (credentials) => {
    return api.post("/api/auth/login", credentials);
};

export const registerCustomer = (userData) => {
    return api.post("/api/auth/register-customer", userData);
};

export const registerManager = (userData) => {
    return api.post("/api/admin/register-manager", userData);
};

export const getAllManagers = () => {
    return api.get("/api/admin/managers");
};
