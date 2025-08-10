// src/pages/ManagerManageFacilitiesPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getManagerHotel, addFacilityToManagerHotel, removeFacilityFromManagerHotel } from '../services/hotelService';
import { getAllFacilities } from '../services/facilityService';
import BackButton from '../components/common/BackButton';

const ManagerManageFacilitiesPage = () => {
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [allFacilities, setAllFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const [hotelRes, facilitiesRes] = await Promise.all([
                getManagerHotel(),
                getAllFacilities()
            ]);
            setHotel(hotelRes.data);
            setAllFacilities(facilitiesRes.data);
        } catch (err) {
            setError('Failed to load data. Make sure you are assigned to a hotel.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const hotelHasFacility = (facilityId) => {
        return hotel.facilities.some(fac => fac.id === facilityId);
    };

    const handleToggleFacility = async (facilityId) => {
        try {
            if (hotelHasFacility(facilityId)) {
                await removeFacilityFromManagerHotel(facilityId);
            } else {
                await addFacilityToManagerHotel(facilityId);
            }
            // Refresh data to show the change
            fetchData();
        } catch (err) {
            alert('Failed to update facility.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <div className="container mt-4"><BackButton /><div className="alert alert-danger">{error}</div></div>;

    return (
        <div className="container">
            <div className="mt-4">
                <BackButton />
            </div>
            <h2 className="my-4">Manage Facilities for: {hotel?.name}</h2>
            <div className="list-group">
                {allFacilities.map(facility => (
                    <div key={facility.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {facility.name}
                        <button
                            className={`btn ${hotelHasFacility(facility.id) ? 'btn-danger' : 'btn-success'}`}
                            onClick={() => handleToggleFacility(facility.id)}
                        >
                            {hotelHasFacility(facility.id) ? 'Remove' : 'Add'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManagerManageFacilitiesPage;