// src/components/common/BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
            &larr; Back
        </button>
    );
};

export default BackButton;