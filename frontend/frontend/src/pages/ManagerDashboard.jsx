// src/pages/ManagerDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/common/BackButton';

const ManagerDashboard = () => {
    return (
        <div className="container">
            <div className="mt-4">
                <BackButton />
            </div>
            <h2 className="my-4 text-center">Manager Dashboard</h2>
            <div className="row justify-content-center">
                <div className="col-md-4 mb-4">
                    <div className="card text-center h-100">
                        <div className="card-body">
                            <h5 className="card-title">View Hotel Bookings</h5>
                            <p className="card-text">See all current and past bookings for your hotel.</p>
                            <Link to="/manager/view-bookings" className="btn btn-primary">View Bookings</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card text-center h-100">
                        <div className="card-body">
                            <h5 className="card-title">Check Room Availability</h5>
                            <p className="card-text">Check for available rooms for any date range.</p>
                            <Link to="/manager/check-availability" className="btn btn-primary">Check Availability</Link>
                        </div>
                    </div>
                </div>
                {/* NEW CARD */}
                <div className="col-md-4 mb-4">
                    <div className="card text-center h-100">
                        <div className="card-body">
                            <h5 className="card-title">Manage Facilities</h5>
                            <p className="card-text">Add or remove facilities for your hotel.</p>
                            <Link to="/manager/manage-facilities" className="btn btn-primary">Manage Facilities</Link>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Edit Hotel Details</h5>
                            <p className="card-text">Update your hotel's information, price, and more.</p>
                            <Link to="/manager/edit-hotel" className="btn btn-primary">Edit Details</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;