import React, { useState, useEffect } from 'react';
import { getAllLocations } from '../services/locationService';

const LocationSidebar = ({ onSelectLocation }) => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await getAllLocations();
                setLocations(response.data);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };
        fetchLocations();
    }, []);

    return (
        <div className="card">
            <div className="card-header">All Locations</div>
            <ul className="list-group list-group-flush">
                <li 
                    className="list-group-item list-group-item-action" 
                    onClick={() => onSelectLocation(null)} // Clear filter
                    style={{ cursor: 'pointer' }}
                >
                    All
                </li>
                {locations.map(location => (
                    <li 
                        key={location.id} 
                        className="list-group-item list-group-item-action"
                        onClick={() => onSelectLocation(location.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {location.city}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocationSidebar;