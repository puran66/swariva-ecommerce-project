import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
    const location = useLocation();
    const { orderId, total } = location.state || { orderId: 'N/A', total: 0 };

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);
    }, []);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    return (
        <div className="order-success-page">
            <div className="container">
                <div className="success-card">
                    <div className="success-animation">
                        <div className="success-checkmark">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="circle" />
                                <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="checkmark" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="success-title">Order Placed Successfully!</h1>
                    <p className="success-message">
                        Thank you for your purchase. Your order has been confirmed.
                    </p>

                    <div className="order-details">
                        <div className="detail-row">
                            <span className="detail-label">Order ID</span>
                            <span className="detail-value">{orderId}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Amount Paid</span>
                            <span className="detail-value">{formatPrice(total)}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Estimated Delivery</span>
                            <span className="detail-value">
                                {estimatedDelivery.toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>

                    <div className="success-actions">
                        <Link to="/products" className="btn btn-primary btn-lg">
                            Continue Shopping
                        </Link>
                        <Link to="/" className="btn btn-secondary btn-lg">
                            Back to Home
                        </Link>
                    </div>

                    <div className="success-note">
                        <p>
                            📧 A confirmation email has been sent to your registered email address.
                        </p>
                        <p>
                            📱 You can track your order status from your account dashboard.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
