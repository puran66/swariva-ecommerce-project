import { useEffect, useState } from 'react';
import './PageLoader.css';

const PageLoader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <div className="page-loader">
            <div className="loader-content">
                <div className="loader-logo">
                    <span className="logo-text">Swariva</span>
                    <span className="logo-tagline">Premium Collection</span>
                </div>
                <div className="loader-spinner">
                    <div className="spinner"></div>
                </div>
            </div>
        </div>
    );
};

export default PageLoader;
