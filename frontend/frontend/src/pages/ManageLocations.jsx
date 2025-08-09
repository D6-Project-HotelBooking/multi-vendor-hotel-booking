// src/pages/ManageLocations.jsx
import React, { useState, useEffect } from 'react';
import { getAllLocations, addLocation } from '../services/locationService';
import BackButton from '../components/common/BackButton'; // Import


const ManageLocations = () => {
    const [locations, setLocations] = useState([]);
    const [formData, setFormData] = useState({ city: '', description: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await getAllLocations();
            setLocations(response.data);
        } catch (err) {
            console.error("Error fetching locations", err);
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
            await addLocation(formData);
            setSuccess('Location added successfully!');
            setFormData({ city: '', description: '' }); // Reset form
            fetchLocations(); // Refresh the list
        } catch (err) {
            setError('Failed to add location.');
            console.error(err);
        }
    };

    return (
        <div className="container">
            <div className="mt-4">
                <BackButton /> {/* Add Here */}
            </div>
            <h2 className="my-4">Manage Locations</h2>

            {/* Add Location Form */}
            <div className="card mb-4">
                <div className="card-header">Add New Location</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">City</label>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className="form-control"></textarea>
                        </div>
                        {success && <div className="alert alert-success">{success}</div>}
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn btn-primary">Add Location</button>
                    </form>
                </div>
            </div>

            {/* Existing Locations List */}
            <div className="card">
                <div className="card-header">Existing Locations</div>
                <ul className="list-group list-group-flush">
                    {locations.map(loc => (
                        <li key={loc.id} className="list-group-item">{loc.city}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ManageLocations;