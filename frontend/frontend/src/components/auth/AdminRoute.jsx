 
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (user && user.roles.includes('ROLE_ADMIN')) {
        return <Outlet />;
    } else {
        return <Navigate to="/" replace />;
    }
};

export default AdminRoute;
