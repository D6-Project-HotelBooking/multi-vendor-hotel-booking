// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllHotels, getHotelsByLocation, getHotelsByFacility } from "../services/hotelService";
import LocationSidebar from "../components/LocationSidebar";
import FacilitySidebar from "../components/FacilitySidebar";
import useFocusEffect from "../hooks/useFocusEffect";

const HomePage = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLocationId, setSelectedLocationId] = useState(null);
    const [selectedFacilityId, setSelectedFacilityId] = useState(null);

    useFocusEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            setError(null);
            try {
                let response;
                if (selectedFacilityId) {
                    response = await getHotelsByFacility(selectedFacilityId);
                } else if (selectedLocationId) {
                    response = await getHotelsByLocation(selectedLocationId);
                } else {
                    response = await getAllHotels();
                }
                setHotels(response.data);
            } catch (error) {
                setError("Could not fetch hotels. Please try again later.");
                console.error("Error fetching hotels:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, [selectedLocationId, selectedFacilityId]);

    const handleSelectLocation = (locationId) => {
        setSelectedFacilityId(null);
        setSelectedLocationId(locationId);
    };

    const handleSelectFacility = (facilityId) => {
        setSelectedLocationId(null);
        setSelectedFacilityId(facilityId);
    };

    return (
        <div className="row">
            <div className="col-md-2">
                <LocationSidebar onSelectLocation={handleSelectLocation} />
            </div>
            <div className="col-md-8">
                <h2 className="my-4 text-center">Find Best Royal Luxury Hotels</h2>
                {loading && <p>Loading hotels...</p>}
                {error && <p className="text-danger">{error}</p>}
                {!loading && !error && (
                    <div className="row">
                        {hotels.length > 0 ? (
                            hotels.map((hotel) => (
                                <div key={hotel.id} className="col-md-6 mb-4">
                                    <Link to={`/hotel/${hotel.id}`} className="text-decoration-none text-dark">
                                        <div className="card h-100 shadow-sm">
                                            {hotel.image1 && (
                                                <img 
                                                    src={`http://localhost:8080/api/public/files/${hotel.image1}`} 
                                                    className="card-img-top" 
                                                    alt={hotel.name}
                                                    style={{ height: '200px', objectFit: 'cover' }} 
                                                />
                                            )}
                                            <div className="card-body">
                                                <h5 className="card-title">{hotel.name}</h5>
                                                <p className="card-text text-muted">{hotel.location.city}</p>
                                                
                                                {/* --- THIS IS THE NEW PART --- */}
                                                <div className="mb-2">
                                                    {hotel.facilities.slice(0, 3).map(facility => (
                                                        <span key={facility.id} className="badge bg-light text-dark me-2">
                                                            {facility.name}
                                                        </span>
                                                    ))}
                                                    {hotel.facilities.length > 3 && (
                                                        <span className="badge bg-light text-dark">...</span>
                                                    )}
                                                </div>
                                                {/* --- END OF NEW PART --- */}

                                                <p className="card-text">
                                                    <strong>Price:</strong> ₹{hotel.pricePerDay} / day
                                                </p>
                                                <button className="btn btn-primary w-100 fw-bold">Book Now</button>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No hotels found for the selected filter.</p>
                        )}
                    </div>
                )}
            </div>
            <div className="col-md-2">
                <FacilitySidebar onSelectFacility={handleSelectFacility} />
            </div>
        </div>
    );
};

export default HomePage;