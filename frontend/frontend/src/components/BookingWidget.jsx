// src/components/BookingWidget.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// This is the corrected, single import line
import { createBooking, checkAvailability } from '../services/bookingService';

const BookingWidget = ({ hotelId, pricePerDay }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [availableRooms, setAvailableRooms] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (checkInDate && checkOutDate) {
            const start = new Date(checkInDate);
            const end = new Date(checkOutDate);
            if (end > start) {
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setTotalPrice(diffDays * pricePerDay);
            } else {
                setTotalPrice(0);
            }
            setAvailableRooms(null);
        }
    }, [checkInDate, checkOutDate, pricePerDay]);

    const handleCheckAvailability = async () => {
        if (!checkInDate || !checkOutDate || new Date(checkOutDate) <= new Date(checkInDate)) {
            setError("Please select valid check-in and check-out dates first.");
            setAvailableRooms(null);
            return;
        }
        setError('');
        setSuccess('');
        try {
            const response = await checkAvailability(hotelId, checkInDate, checkOutDate);
            setAvailableRooms(response.data.availableRooms);
        } catch (err) {
            setError("Could not check availability. Please try again later.");
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!user) {
            navigate('/login');
            return;
        }

        if (!checkInDate || !checkOutDate || new Date(checkOutDate) <= new Date(checkInDate)) {
            setError("Please select valid check-in and check-out dates.");
            return;
        }

        const bookingData = { hotelId, checkInDate, checkOutDate };

        try {
            await createBooking(bookingData);
            setSuccess(`Booking successful! Your request is pending approval. Total Price: ₹${totalPrice}`);
            setAvailableRooms(null);
        } catch (err) {
            setError(err.response?.data?.message || "Booking failed. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-body">
                <h5 className="card-title text-center mb-3">Book This Hotel</h5>
                <p className="card-text text-center">
                    <strong>Price:</strong> ₹{pricePerDay} / day
                </p>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label className="form-label">Check-in Date</label>
                        <input type="date" className="form-control" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Check-out Date</label>
                        <input type="date" className="form-control" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
                    </div>

                    <div className="d-grid gap-2 mb-3">
                         <button type="button" className="btn btn-secondary" onClick={handleCheckAvailability}>
                            Check Availability
                        </button>
                    </div>

                    {availableRooms !== null && (
                        <div className={`alert ${availableRooms > 0 ? 'alert-info' : 'alert-warning'}`}>
                            <strong>{availableRooms}</strong> rooms available for these dates.
                        </div>
                    )}

                    {totalPrice > 0 && <h5 className="text-center mb-3">Total Price: ₹{totalPrice}</h5>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary fw-bold">
                            {user ? "Book Now" : "Login to Book"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingWidget;