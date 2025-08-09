// src/pages/ManageFacilities.jsx
import React, { useState, useEffect } from 'react';
import { getAllFacilities, addFacility } from '../services/facilityService';
import BackButton from '../components/common/BackButton'; // Import

const ManageFacilities = () => {
    const [facilities, setFacilities] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchFacilities();
    }, []);

    const fetchFacilities = async () => {
        try {
            const response = await getAllFacilities();
            setFacilities(response.data);
        } catch (err) {
            console.error("Error fetching facilities", err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await addFacility(formData);
            setSuccess('Facility added successfully!');
            setFormData({ name: '', description: '' }); // Reset form
            fetchFacilities(); // Refresh the list
        } catch (err) {
            setError('Failed to add facility.');
            console.error(err);
        }
    };

    return (
        <div className="container">
             <div className="mt-4">
                <BackButton /> {/* Add Here */}
            </div>
            <h2 className="my-4">Manage Facilities</h2>

            {/* Add Facility Form */}
            <div className="card mb-4">
                <div className="card-header">Add New Facility</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Facility Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className="form-control"></textarea>
                        </div>
                        {success && <div className="alert alert-success">{success}</div>}
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn btn-primary">Add Facility</button>
                    </form>
                </div>
            </div>

            {/* Existing Facilities List */}
            <div className="card">
                <div className="card-header">Existing Facilities</div>
                <ul className="list-group list-group-flush">
                    {facilities.map(fac => (
                        <li key={fac.id} className="list-group-item">{fac.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ManageFacilities;