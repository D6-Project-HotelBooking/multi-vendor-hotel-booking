// src/pages/ManageHotels.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllHotels } from '../services/hotelService';
// This import path is often the cause of the error. Ensure it's correct.
import useFocusEffect from '../hooks/useFocusEffect'; 
import BackButton from '../components/common/BackButton'; // Import

const ManageHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchHotels = async () => {
        setLoading(true);
        try {
            const response = await getAllHotels();
            setHotels(response.data);
        } catch (err) {
            setError('Failed to fetch hotels.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Use the custom hook to refetch data every time the page is focused
    useFocusEffect(fetchHotels, []); // Pass an empty dependency array

    if (loading) return <p>Loading hotels...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container">
            <div className="mt-4">
                <BackButton /> {/* Add Here */}
            </div>
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2>Manage Hotels</h2>
                <Link to="/admin/add-hotel" className="btn btn-primary">
                    Add New Hotel
                </Link>
            </div>

            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Price per Day</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hotels.map(hotel => (
                        <tr key={hotel.id}>
                            <td>{hotel.id}</td>
                            <td>{hotel.name}</td>
                            <td>{hotel.location.city}</td>
                            <td>₹{hotel.pricePerDay}</td>
                            <td>
                                <Link to={`/admin/manage-hotels/${hotel.id}/edit`} className="btn btn-sm btn-info me-2">
                                    Edit
                                </Link>
                                <Link to={`/admin/manage-hotels/${hotel.id}/facilities`} className="btn btn-sm btn-secondary">
                                    Facilities
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageHotels;