import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminRoute from "./components/auth/AdminRoute";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ManageLocations from "./pages/ManageLocations";
import ManageFacilities from "./pages/ManageFacilities";
import ManageHotels from "./pages/ManageHotels";
import AddHotelPage from "./pages/AddHotelPage";
import AdminViewBookings from "./pages/AdminViewBookings";
import RegisterManagerPage from "./pages/RegisterManagerPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Public Routes */}
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />

                    {/* Admin Protected Routes */}
                    <Route element={<AdminRoute />}>
                        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
                        <Route path="/admin/manage-locations" element={<ManageLocations />} />
                        <Route path="/admin/manage-facilities" element={<ManageFacilities />} />
                        <Route path="/admin/manage-hotels" element={<ManageHotels />} />
                        <Route path="/admin/add-hotel" element={<AddHotelPage />} />
                        <Route path="/admin/view-bookings" element={<AdminViewBookings />} />
                        <Route path="/admin/register-manager" element={<RegisterManagerPage />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}
export default App;
