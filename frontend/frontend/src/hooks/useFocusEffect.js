import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useFocusEffect = (callback, deps) => {
    const location = useLocation();

    useEffect(() => {
        callback();
    }, [location.pathname, ...deps]);
};

export default useFocusEffect;