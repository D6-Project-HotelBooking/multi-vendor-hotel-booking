// src/context/AuthContext.jsx - MINIMAL VERSION
import React, { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Danish will add the logic for user, token, login, logout here
    const value = { user: null }; 

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};