// src/pages/ManagerCheckAvailabilityPage.jsx
import React, { useState, useEffect } from 'react';
import { getManagerHotel } from '../services/hotelService';
import { checkAvailability } from '../services/bookingService';
import BackButton from '../components/common/BackButton'; // Import

const ManagerCheckAvailabilityPage = () => {
    const [hotel, setHotel] = useState(null);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [availableRooms, setAvailableRooms] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchManagerHotel = async () => {
            try {
                const response = await getManagerHotel();
                setHotel(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Could not fetch your hotel information. Make sure you are assigned to a hotel.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchManagerHotel();
    }, []);

    const handleCheck = async () => {
        if (!hotel || !checkInDate || !checkOutDate || new Date(checkOutDate) <= new Date(checkInDate)) {
            setError("Please select a valid date range.");
            setAvailableRooms(null);
            return;
        }
        setError('');
        try {
            const response = await checkAvailability(hotel.id, checkInDate, checkOutDate);
            setAvailableRooms(response.data.availableRooms);
        } catch (err) {
            setError("Failed to check availability.");
            console.error(err);
        }
    };

    if (loading) return <p>Loading hotel information...</p>

    return (
        <div className="container" style={{ maxWidth: "700px" }}>
             <div className="mt-4">
                <BackButton /> {/* Add Here */}
            </div>
            <h2 className="my-4">Check Room Availability</h2>
            
            {error && !hotel && <div className="alert alert-danger">{error}</div>}

            {hotel && (
                <div className="card shadow-sm border-0">
                    <div className="card-header">
                        Checking for hotel: <strong>{hotel.name}</strong>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Check-in Date</label>
                                <input type="date" className="form-control" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Check-out Date</label>
                                <input type="date" className="form-control" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
                            </div>
                        </div>
                        <div className="d-grid">
                           <button onClick={handleCheck} className="btn btn-primary">Check</button>
                        </div>
                         {error && <div className="alert alert-danger mt-3">{error}</div>}
                        {availableRooms !== null && (
                            <div className="alert alert-info mt-3">
                                <strong>{availableRooms}</strong> rooms are available for the selected dates.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagerCheckAvailabilityPage;