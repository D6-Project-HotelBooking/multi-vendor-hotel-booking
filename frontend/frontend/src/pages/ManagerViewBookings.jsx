// src/pages/ManagerViewBookings.jsx
import React, { useState, useEffect } from 'react';
import { getManagerBookings, updateBookingStatus, checkAvailability } from '../services/bookingService';
import BackButton from '../components/common/BackButton'; // Import

// A sub-component to handle the display and logic for a single booking card.
// This helps manage the 'availableRooms' state independently for each card.
const BookingCard = ({ booking, onStatusUpdate }) => {
    const [availableRooms, setAvailableRooms] = useState(null);
    const [loadingAvailability, setLoadingAvailability] = useState(false);

    const handleCheckAvailability = async () => {
        setLoadingAvailability(true);
        try {
            const response = await checkAvailability(booking.hotel.id, booking.checkInDate, booking.checkOutDate);
            // We show rooms available *besides* the current one, so we add 1 if it's an active booking.
            const roomsLeft = (booking.bookingStatus === 'PENDING' || booking.bookingStatus === 'APPROVED') 
                ? response.data.availableRooms + 1 
                : response.data.availableRooms;
            setAvailableRooms(roomsLeft);
        } catch (err) {
            console.error("Could not check availability for booking #" + booking.id, err);
            setAvailableRooms('Error');
        } finally {
            setLoadingAvailability(false);
        }
    };

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

    return (
        <div className="card mb-3 shadow-sm border-0">
            <div className="card-header d-flex justify-content-between align-items-center">
               <h5 className="mb-0">Booking #{booking.id} - {booking.customer.firstName} {booking.customer.lastName}</h5>
               <span className={getStatusBadge(booking.bookingStatus)}>
                   {booking.bookingStatus}
               </span>
            </div>
            <div className="card-body">
               <p className="mb-1"><strong>Email:</strong> {booking.customer.email}</p>
               <p className="mb-1"><strong>Check-in:</strong> {booking.checkInDate}</p>
               <p className="mb-1"><strong>Check-out:</strong> {booking.checkOutDate}</p>
               <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
               
               <div className="d-flex align-items-center mb-3">
                    <button className="btn btn-sm btn-outline-secondary" onClick={handleCheckAvailability} disabled={loadingAvailability}>
                        {loadingAvailability ? 'Checking...' : 'Check Rooms Left'}
                    </button>
                    {availableRooms !== null && (
                        <span className="ms-3 fw-bold">{availableRooms} other rooms were available for this period.</span>
                    )}
               </div>

               {booking.bookingStatus === 'PENDING' && (
                   <div>
                       <button className="btn btn-success me-2" onClick={() => onStatusUpdate(booking.id, 'APPROVED')}>Approve</button>
                       <button className="btn btn-danger" onClick={() => onStatusUpdate(booking.id, 'CANCELLED')}>Cancel</button>
                   </div>
               )}
            </div>
        </div>
    );
};


const ManagerViewBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchBookings = async () => {
        try {
            const response = await getManagerBookings();
            // Sort bookings to show PENDING ones first
            response.data.sort((a, b) => (a.bookingStatus === 'PENDING' ? -1 : 1));
            setBookings(response.data);
        } catch (err) {
            setError('Failed to fetch bookings.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleStatusUpdate = async (bookingId, status) => {
        try {
            await updateBookingStatus(bookingId, status);
            // Refresh the list to show the change
            fetchBookings(); 
        } catch (err) {
            alert("Failed to update status.");
            console.error(err);
        }
    };

    if (loading) return <p>Loading your hotel bookings...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container">
            <div className="mt-4">
                <BackButton /> {/* Add Here */}
            </div>
            <h2 className="my-4">Hotel Bookings Dashboard</h2>
            {bookings.length > 0 ? (
                bookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} onStatusUpdate={handleStatusUpdate} />
                ))
            ) : (
                <div className="alert alert-info">No bookings found for your hotel.</div>
            )}
        </div>
    );
};

export default ManagerViewBookings;