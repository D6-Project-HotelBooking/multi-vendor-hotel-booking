import React, { useState, useEffect } from 'react';
import { getAllFacilities } from '../services/facilityService';

const FacilitySidebar = ({ onSelectFacility }) => {
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const response = await getAllFacilities();
                setFacilities(response.data);
            } catch (error) {
                console.error("Error fetching facilities:", error);
            }
        };
        fetchFacilities();
    }, []);

    return (
        <div className="card">
            <div className="card-header">All Facilities</div>
            <ul className="list-group list-group-flush">
                <li
                    className="list-group-item list-group-item-action"
                    onClick={() => onSelectFacility(null)} // Clear filter
                    style={{ cursor: 'pointer' }}
                >
                    All
                </li>
                {facilities.map(facility => (
                    <li
                        key={facility.id}
                        className="list-group-item list-group-item-action"
                        onClick={() => onSelectFacility(facility.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {facility.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FacilitySidebar;