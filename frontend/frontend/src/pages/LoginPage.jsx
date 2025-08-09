// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await loginUser(formData);
            
            // 1. Capture the logged-in user object returned from the context
            const loggedInUser = login(response.data.jwt);
            
            // 2. Redirect based on the user's role
            if (loggedInUser.roles.includes('ROLE_ADMIN')) {
                navigate('/admin-dashboard');
            } else if (loggedInUser.roles.includes('ROLE_HOTEL_MANAGER')) {
                navigate('/manager-dashboard');
            } else {
                navigate('/'); // Default redirect for customers
            }

        } catch (err) {
            setError('Failed to login. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '500px' }}>
                <div className="card shadow-lg p-4 border-0">
                    <h2 className="text-center mb-4" style={{ color: 'var(--primary-color)'}}>User Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Id</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="d-grid">
                           <button type="submit" className="btn btn-primary fw-bold">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;