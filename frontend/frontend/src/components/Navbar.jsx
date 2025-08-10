// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ backgroundColor: 'var(--primary-color)' }}>
            <div className="container-fluid">
                <div className="navbar-nav">
                    <Link className="nav-link" to="/" title="Go to Homepage">
                        <i className="bi bi-house-door-fill fs-4"></i>
                    </Link>
                </div>
                <Link className="navbar-brand mx-auto fw-bold fs-4" to="/">
                    Royal & Luxury Hotels
                </Link>
                <div className="navbar-nav ms-auto">
                    <ul className="navbar-nav">
                        {user ? (
                            <>
                                {user.roles.includes('ROLE_ADMIN') && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
                                    </li>
                                )}
                                {user.roles.includes('ROLE_CUSTOMER') && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/my-bookings">My Bookings</Link>
                                    </li>
                                )}
                                {user.roles.includes('ROLE_HOTEL_MANAGER') && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/manager-dashboard">Manager Dashboard</Link>
                                    </li>
                                )}
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Welcome, {user.sub.split('@')[0]}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
