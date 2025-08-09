// src/pages/AdminViewBookings.jsx
import React, { useState, useEffect } from 'react';
import { getAllBookings } from '../services/bookingService';
import BackButton from '../components/common/BackButton'; // Import

const AdminViewBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getAllBookings();
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

    if (loading) return <p>Loading all bookings...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container">
            <div className="mt-4">
                <BackButton /> {/* Add Here */}
            </div>
            <h2 className="my-4">All System Bookings</h2>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hotel</th>
                        <th>Customer</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Total Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.hotel.name}</td>
                            <td>{booking.customer.email}</td>
                            <td>{booking.checkInDate}</td>
                            <td>{booking.checkOutDate}</td>
                            <td>₹{booking.totalPrice}</td>
                            <td>
                                <span className={getStatusBadge(booking.bookingStatus)}>
                                    {booking.bookingStatus}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminViewBookings;