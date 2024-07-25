import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector(state => state.auth?.isAuthenticated);

    useEffect(() => {
        const checkAuth = () => {
            if (authentication && !authStatus) {
                // Redirect to login if authentication is required but not authenticated
                navigate("/login");
            } else if (!authentication && authStatus) {
                // Redirect to home if no authentication is required but already authenticated
                navigate("/");
            } else {
                // No redirection needed
                setLoading(false);
            }
        };

        checkAuth();
    }, [authStatus, navigate, authentication]);

    // Render loading state while checking authentication
    return loading ? <h1>Loading...</h1> : <>{children}</>;
}
