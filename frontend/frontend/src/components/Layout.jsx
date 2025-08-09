// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
    return (
        <>
            <Navbar />
            {/* The <main> tag now gets the flex: 1 style */}
            <main className="container mt-4"> 
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;