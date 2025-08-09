import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decodedUser = jwtDecode(storedToken);
                setUser(decodedUser);
                setToken(storedToken);
            } catch (error) {
                localStorage.removeItem('token');
                setUser(null);
                setToken(null);
            }
        }
        setLoading(false);
    }, []);

    const login = (newToken) => {
        const decodedUser = jwtDecode(newToken);
        localStorage.setItem('token', newToken);
        setUser(decodedUser);
        setToken(newToken);
        return decodedUser;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
