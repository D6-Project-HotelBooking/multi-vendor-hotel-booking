// src/pages/AdminDashboardPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';



const AdminDashboardPage = () => {
    return (
        <div className="container">
            <h2 className="my-4 text-center">Admin Dashboard</h2>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card text-center h-100">
                        <div className="card-body">
                            <h5 className="card-title">Manage Locations</h5>
                            <p className="card-text">Add or view hotel locations.</p>
                            <Link to="/admin/manage-locations" className="btn btn-primary">Go to Locations</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card text-center h-100">
                        <div className="card-body">
                            <h5 className="card-title">Manage Facilities</h5>
                            <p className="card-text">Add or view hotel facilities.</p>
                            <Link to="/admin/manage-facilities" className="btn btn-primary">Go to Facilities</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card text-center h-100">
                        <div className="card-body">
                            <h5 className="card-title">Manage Hotels</h5>
                            <p className="card-text">Add or view hotels.</p>
                            <Link to="/admin/manage-hotels" className="btn btn-primary">Go to Hotels</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card text-center h-100">
                        <div className="card-body">
                            <h5 className="card-title">Manage Users</h5>
                            <p className="card-text">Register new hotel managers.</p>
                            <Link to="/admin/register-manager" className="btn btn-primary">Go to Users</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card text-center h-100">
                        <div className="card-body">
                            <h5 className="card-title">View All Bookings</h5>
                            <p className="card-text">See a list of all bookings in the system.</p>
                            <Link to="/admin/view-bookings" className="btn btn-primary">Go to Bookings</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;