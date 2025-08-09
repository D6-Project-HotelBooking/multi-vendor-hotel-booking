// src/components/Footer.jsx
import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        // Use our new primary color for the background
        <footer 
            className="footer py-3 text-white" 
            style={{ backgroundColor: 'var(--primary-color)' }}
        >
            <div className="container text-center">
                <p>&copy; {currentYear} Royal & Luxury Hotels. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;