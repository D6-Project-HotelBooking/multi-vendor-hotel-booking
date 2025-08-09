// src/hooks/useFocusEffect.js
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const useFocusEffect = (callback, deps) => {
    const location = useLocation();

    useEffect(() => {
        // Call the callback function whenever the location changes
        callback();
    }, [location.pathname, ...deps]); // Reruns when the path or dependencies change
};

export default useFocusEffect;