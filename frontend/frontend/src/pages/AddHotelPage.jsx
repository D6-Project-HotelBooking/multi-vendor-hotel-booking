// src/pages/AddHotelPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHotel, uploadImage } from '../services/hotelService';
import { getAllLocations } from '../services/locationService';
import { getAllManagers } from '../services/authService';

const AddHotelPage = () => {
    const [locations, setLocations] = useState([]);
    const [managers, setManagers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        pricePerDay: '',
        totalRoom: '',
        hotelEmail: '',
        street: '',
        pincode: '',
        locationId: '',
        hotelAdminId: '',
        image1: '',
        image2: '',
        image3: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [locationsRes, managersRes] = await Promise.all([
                    getAllLocations(),
                    getAllManagers()
                ]);
                setLocations(locationsRes.data);
                setManagers(managersRes.data);
            } catch (err) {
                setError("Failed to load necessary data.");
                console.error(err);
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
            alert(`${name} uploaded successfully!`);
        } catch (err) {
            setError(`Failed to upload ${name}.`);
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await addHotel(formData);
            setSuccess('Hotel added successfully!');
            setTimeout(() => {
                navigate('/admin/manage-hotels');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add hotel.');
            console.error(err);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <div className="card shadow-lg p-4 my-4">
                <h2 className="text-center mb-4">Add New Hotel</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Hotel Name</label>
                        <input type="text" name="name" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Location</label>
                        <select name="locationId" className="form-select" onChange={handleChange} required>
                            <option value="">Select Location</option>
                            {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.city}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Hotel Admin</label>
                        <select name="hotelAdminId" className="form-select" onChange={handleChange} required>
                            <option value="">Select Hotel Admin</option>
                            {managers.map(man => <option key={man.id} value={man.id}>{man.firstName} {man.lastName} ({man.email})</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Hotel Description</label>
                        <textarea name="description" className="form-control" onChange={handleChange}></textarea>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Hotel Email</label>
                            <input type="email" name="hotelEmail" className="form-control" onChange={handleChange} />
                        </div>
                         <div className="col-md-6 mb-3">
                            <label className="form-label">Price Per Day</label>
                            <input type="number" name="pricePerDay" className="form-control" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                         <div className="col-md-6 mb-3">
                            <label className="form-label">Total Rooms</label>
                            <input type="number" name="totalRoom" className="form-control" onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Pincode</label>
                            <input type="text" name="pincode" className="form-control" onChange={handleChange} />
                        </div>
                    </div>
                     <div className="mb-3">
                        <label className="form-label">Street</label>
                        <input type="text" name="street" className="form-control" onChange={handleChange} />
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Hotel Image 1</label>
                            <input type="file" name="image1" className="form-control" onChange={handleFileChange} />
                            {formData.image1 && <small className="text-success">Uploaded: {formData.image1}</small>}
                        </div>
                         <div className="col-md-4 mb-3">
                            <label className="form-label">Hotel Image 2</label>
                            <input type="file" name="image2" className="form-control" onChange={handleFileChange} />
                            {formData.image2 && <small className="text-success">Uploaded: {formData.image2}</small>}
                        </div>
                         <div className="col-md-4 mb-3">
                            <label className="form-label">Hotel Image 3</label>
                            <input type="file" name="image3" className="form-control" onChange={handleFileChange} />
                            {formData.image3 && <small className="text-success">Uploaded: {formData.image3}</small>}
                        </div>
                    </div>

                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100">Add Hotel</button>
                </form>
            </div>
        </div>
    );
};

export default AddHotelPage;