// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerCustomer } from '../services/authService';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        contactNo: '',
        age: '',
        street: '',
        city: '',
        pincode: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await registerCustomer(formData);
            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <div className="card shadow-lg p-4">
                <h2 className="text-center mb-4">Register Customer</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">First Name</label>
                            <input type="text" name="firstName" className="form-control" onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Last Name</label>
                            <input type="text" name="lastName" className="form-control" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email Id</label>
                            <input type="email" name="email" className="form-control" onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" onChange={handleChange} required />
                        </div>
                    </div>
                     <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Gender</label>
                            <select name="gender" className="form-select" onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Contact No</label>
                            <input type="text" name="contactNo" className="form-control" onChange={handleChange} />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Age</label>
                            <input type="number" name="age" className="form-control" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Street</label>
                        <textarea name="street" className="form-control" onChange={handleChange}></textarea>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">City</label>
                            <input type="text" name="city" className="form-control" onChange={handleChange} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Pincode</label>
                            <input type="text" name="pincode" className="form-control" onChange={handleChange} />
                        </div>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100">Register User</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;