// src/pages/ManagerEditHotelPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getManagerHotel, updateHotel, uploadImage } from '../services/hotelService';
import { getAllLocations } from '../services/locationService';
import BackButton from '../components/common/BackButton';

const ManagerEditHotelPage = () => {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);
    const [hotelId, setHotelId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [hotelRes, locationsRes] = await Promise.all([
                    getManagerHotel(),
                    getAllLocations()
                ]);
                const hotelData = hotelRes.data;
                setHotelId(hotelData.id); // Store the hotel ID
                setFormData({
                    name: hotelData.name,
                    description: hotelData.description,
                    pricePerDay: hotelData.pricePerDay,
                    totalRoom: hotelData.totalRoom,
                    hotelEmail: hotelData.hotelEmail,
                    street: hotelData.street,
                    pincode: hotelData.pincode,
                    locationId: hotelData.location.id,
                    image1: hotelData.image1 || '',
                    image2: hotelData.image2 || '',
                    image3: hotelData.image3 || ''
                });
                setLocations(locationsRes.data);
            } catch (err) {
                setError("Failed to load hotel data. Make sure you are assigned to a hotel.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const name = e.target.name;
        if (!file) return;

        try {
            const response = await uploadImage(file);
            const filename = response.data.filename;
            setFormData({ ...formData, [name]: filename });
            alert(`${name} uploaded successfully and will be saved when you update the hotel.`);
        } catch (err) {
            setError(`Failed to upload ${name}.`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await updateHotel(hotelId, formData);
            setSuccess('Hotel updated successfully!');
            setTimeout(() => {
                navigate('/manager-dashboard');
            }, 2000);
        } catch (err) {
            setError('Failed to update hotel.');
        }
    };

    if (loading) return <p>Loading hotel data...</p>;
    if (error && !formData) return <div className="container mt-4"><BackButton /><div className="alert alert-danger">{error}</div></div>;

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <div className="mt-4">
                <BackButton />
            </div>
            <div className="card shadow-lg p-4 my-4">
                <h2 className="text-center mb-4">Edit Your Hotel Details</h2>
                {formData && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Hotel Name</label>
                            <input type="text" name="name" value={formData.name} className="form-control" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Location</label>
                            <select name="locationId" value={formData.locationId} className="form-select" onChange={handleChange} required>
                                <option value="">Select Location</option>
                                {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.city}</option>)}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Hotel Description</label>
                            <textarea name="description" value={formData.description} className="form-control" onChange={handleChange} rows="4"></textarea>
                        </div>
                         <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Hotel Email</label>
                                <input type="email" name="hotelEmail" value={formData.hotelEmail} className="form-control" onChange={handleChange} />
                            </div>
                             <div className="col-md-6 mb-3">
                                <label className="form-label">Price Per Day</label>
                                <input type="number" name="pricePerDay" value={formData.pricePerDay} className="form-control" onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="row">
                             <div className="col-md-6 mb-3">
                                <label className="form-label">Total Rooms</label>
                                <input type="number" name="totalRoom" value={formData.totalRoom} className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Pincode</label>
                                <input type="text" name="pincode" value={formData.pincode} className="form-control" onChange={handleChange} />
                            </div>
                        </div>
                         <div className="mb-3">
                            <label className="form-label">Street</label>
                            <input type="text" name="street" value={formData.street} className="form-control" onChange={handleChange} />
                        </div>
                        <hr />
                        <h5 className="mb-3">Manage Hotel Images</h5>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Image 1</label>
                                <input type="file" name="image1" className="form-control" onChange={handleFileChange} />
                                {formData.image1 && <small className="text-success d-block mt-1">Current: {formData.image1}</small>}
                            </div>
                             <div className="col-md-4 mb-3">
                                <label className="form-label">Image 2</label>
                                <input type="file" name="image2" className="form-control" onChange={handleFileChange} />
                                {formData.image2 && <small className="text-success d-block mt-1">Current: {formData.image2}</small>}
                            </div>
                             <div className="col-md-4 mb-3">
                                <label className="form-label">Image 3</label>
                                <input type="file" name="image3" className="form-control" onChange={handleFileChange} />
                                {formData.image3 && <small className="text-success d-block mt-1">Current: {formData.image3}</small>}
                            </div>
                        </div>
                        {success && <div className="alert alert-success">{success}</div>}
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn btn-primary w-100 fw-bold">Update Hotel</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ManagerEditHotelPage;