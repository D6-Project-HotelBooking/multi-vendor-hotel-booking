// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HotelDetailPage from "./pages/HotelDetailPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import AdminRoute from "./components/auth/AdminRoute";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ManageLocations from "./pages/ManageLocations";
import ManageFacilities from "./pages/ManageFacilities";
import ManageHotels from "./pages/ManageHotels";
import AddHotelPage from "./pages/AddHotelPage";
import AdminViewBookings from "./pages/AdminViewBookings";
import RegisterManagerPage from "./pages/RegisterManagerPage";
import ManagerRoute from "./components/auth/ManagerRoute";
import ManagerDashboard from "./pages/ManagerDashboard";
import ManagerViewBookings from "./pages/ManagerViewBookings";
import ManagerCheckAvailabilityPage from "./pages/ManagerCheckAvailabilityPage";
import ManagerEditHotelPage from "./pages/ManagerEditHotelPage";
import ManagerManageFacilitiesPage from "./pages/ManagerManageFacilitiesPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Public & Customer Routes */}
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="/hotel/:hotelId" element={<HotelDetailPage />} />
                    <Route path="/my-bookings" element={<MyBookingsPage />} />

                    {/* Admin Routes */}
                    <Route element={<AdminRoute />}>
                        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
                        <Route path="/admin/manage-locations" element={<ManageLocations />} />
                        <Route path="/admin/manage-facilities" element={<ManageFacilities />} />
                        <Route path="/admin/manage-hotels" element={<ManageHotels />} />
                        <Route path="/admin/add-hotel" element={<AddHotelPage />} />
                        <Route path="/admin/view-bookings" element={<AdminViewBookings />} />
                        <Route path="/admin/register-manager" element={<RegisterManagerPage />} />
                    </Route>

                    {/* Manager Routes */}
                    <Route element={<ManagerRoute />}>
                        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
                        <Route path="/manager/view-bookings" element={<ManagerViewBookings />} />
                        <Route path="/manager/check-availability" element={<ManagerCheckAvailabilityPage />} />
                        <Route path="/manager/edit-hotel" element={<ManagerEditHotelPage />} />
                        <Route path="/manager/manage-facilities" element={<ManagerManageFacilitiesPage />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}
export default App;