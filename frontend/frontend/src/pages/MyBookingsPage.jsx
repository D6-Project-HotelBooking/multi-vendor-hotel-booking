// src/pages/MyBookingsPage.jsx
import React, { useState, useEffect } from 'react';
import { getMyBookings } from '../services/bookingService';

const MyBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getMyBookings();
                setBookings(response.data);
            } catch (err) {
                setError('Failed to fetch bookings.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'APPROVED':
                return 'badge bg-success';
            case 'PENDING':
                return 'badge bg-warning text-dark';
            case 'CANCELLED':
                return 'badge bg-danger';
            default:
                return 'badge bg-secondary';
        }
    };

    if (loading) return <p>Loading your bookings...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container">
            <h2 className="my-4">My Bookings</h2>
            {bookings.length > 0 ? (
                bookings.map(booking => (
                    <div key={booking.id} className="card mb-3">
                        <div className="card-header d-flex justify-content-between">
                           <h5>{booking.hotel.name}</h5>
                           <span className={getStatusBadge(booking.bookingStatus)}>
                               {booking.bookingStatus}
                           </span>
                        </div>
                        <div className="card-body">
                            <p><strong>Location:</strong> {booking.hotel.location.city}</p>
                            <p><strong>Check-in:</strong> {booking.checkInDate}</p>
                            <p><strong>Check-out:</strong> {booking.checkOutDate}</p>
                            <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>You have not made any bookings yet.</p>
            )}
        </div>
    );
};

export default MyBookingsPage;