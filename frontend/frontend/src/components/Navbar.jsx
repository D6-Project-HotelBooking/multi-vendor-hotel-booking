// src/components/Navbar.jsx - MINIMAL VERSION
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ backgroundColor: 'var(--primary-color)' }}>
            <div className="container-fluid">
                <Link className="navbar-brand mx-auto fw-bold fs-4" to="/">
                    Royal & Luxury Hotels
                </Link>
            </div>
        </nav>
    );
};
export default Navbar;