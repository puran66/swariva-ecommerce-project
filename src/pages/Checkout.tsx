import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

interface AddressForm {
    name: string;
    mobile: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
}

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod'>('upi');
    const [upiProvider, setUpiProvider] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');

    const [addressForm, setAddressForm] = useState<AddressForm>({
        name: '',
        mobile: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    });

    const deliveryCharge = cartTotal > 50000 ? 0 : 500;
    const codAdvance = paymentMethod === 'cod' ? Math.round(cartTotal * 0.25) : 0;
    const finalTotal = cartTotal + deliveryCharge;
    const payableNow = paymentMethod === 'cod' ? codAdvance : finalTotal;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAddressForm({
            ...addressForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddressSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePlaceOrder = () => {
        // Simulate order placement
        const orderId = 'SWR' + Math.random().toString(36).substring(2, 9).toUpperCase();
        clearCart();
        navigate('/order-success', { state: { orderId, total: payableNow } });
    };

    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <h1 className="page-title">Checkout</h1>

                <div className="checkout-content">
                    {/* Steps Indicator */}
                    <div className="checkout-steps">
                        <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                            <div className="step-number">1</div>
                            <div className="step-label">Address</div>
                        </div>
                        <div className="step-divider"></div>
                        <div className={`step ${step >= 2 ? 'active' : ''}`}>
                            <div className="step-number">2</div>
                            <div className="step-label">Payment</div>
                        </div>
                    </div>

                    <div className="checkout-main">
                        {/* Step 1: Address */}
                        {step === 1 && (
                            <div className="checkout-section">
                                <h2 className="section-title">Delivery Address</h2>
                                <form onSubmit={handleAddressSubmit} className="address-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">Full Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-input"
                                                value={addressForm.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Mobile Number *</label>
                                            <input
                                                type="tel"
                                                name="mobile"
                                                className="form-input"
                                                value={addressForm.mobile}
                                                onChange={handleInputChange}
                                                pattern="[0-9]{10}"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Address *</label>
                                        <textarea
                                            name="address"
                                            className="form-textarea"
                                            value={addressForm.address}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">City *</label>
                                            <input
                                                type="text"
                                                name="city"
                                                className="form-input"
                                                value={addressForm.city}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">State *</label>
                                            <input
                                                type="text"
                                                name="state"
                                                className="form-input"
                                                value={addressForm.state}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Pincode *</label>
                                            <input
                                                type="text"
                                                name="pincode"
                                                className="form-input"
                                                value={addressForm.pincode}
                                                onChange={handleInputChange}
                                                pattern="[0-9]{6}"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg">
                                        Continue to Payment
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Step 2: Payment */}
                        {step === 2 && (
                            <div className="checkout-section">
                                <button
                                    className="back-button"
                                    onClick={() => setStep(1)}
                                >
                                    ← Back to Address
                                </button>

                                <h2 className="section-title">Payment Method</h2>

                                <div className="payment-methods">
                                    <div
                                        className={`payment-option ${paymentMethod === 'upi' ? 'active' : ''}`}
                                        onClick={() => setPaymentMethod('upi')}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="upi"
                                            checked={paymentMethod === 'upi'}
                                            onChange={() => setPaymentMethod('upi')}
                                        />
                                        <div className="payment-info">
                                            <div className="payment-title">UPI Payment</div>
                                            <div className="payment-description">Pay using Google Pay, PhonePe, or Paytm</div>
                                        </div>
                                    </div>

                                    {paymentMethod === 'upi' && (
                                        <div className="upi-providers">
                                            <button
                                                className={`upi-btn ${upiProvider === 'gpay' ? 'active' : ''}`}
                                                onClick={() => setUpiProvider('gpay')}
                                            >
                                                Google Pay
                                            </button>
                                            <button
                                                className={`upi-btn ${upiProvider === 'phonepe' ? 'active' : ''}`}
                                                onClick={() => setUpiProvider('phonepe')}
                                            >
                                                PhonePe
                                            </button>
                                            <button
                                                className={`upi-btn ${upiProvider === 'paytm' ? 'active' : ''}`}
                                                onClick={() => setUpiProvider('paytm')}
                                            >
                                                Paytm
                                            </button>
                                        </div>
                                    )}

                                    <div
                                        className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}
                                        onClick={() => setPaymentMethod('cod')}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={() => setPaymentMethod('cod')}
                                        />
                                        <div className="payment-info">
                                            <div className="payment-title">Cash on Delivery</div>
                                            <div className="payment-description">
                                                Pay 25% advance now, rest on delivery
                                            </div>
                                        </div>
                                    </div>

                                    {paymentMethod === 'cod' && (
                                        <div className="cod-info">
                                            <p>
                                                <strong>Advance Payment:</strong> {formatPrice(codAdvance)} (25%)
                                            </p>
                                            <p>
                                                <strong>Pay on Delivery:</strong> {formatPrice(finalTotal - codAdvance)}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <button
                                    className="btn btn-accent btn-lg place-order-btn"
                                    onClick={handlePlaceOrder}
                                >
                                    Place Order - {formatPrice(payableNow)}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="order-summary">
                        <h3 className="summary-title">Order Summary</h3>

                        <div className="summary-items">
                            {cart.map((item) => (
                                <div key={item.id} className="summary-item">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        onError={(e) => {
                                            e.currentTarget.src = `https://via.placeholder.com/60x60/8B5CF6/FFFFFF?text=${item.name.charAt(0)}`;
                                        }}
                                    />
                                    <div className="summary-item-info">
                                        <div className="summary-item-name">{item.name}</div>
                                        <div className="summary-item-qty">Qty: {item.quantity}</div>
                                    </div>
                                    <div className="summary-item-price">
                                        {formatPrice(item.price * item.quantity)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>

                        <div className="summary-row">
                            <span>Delivery</span>
                            <span className={deliveryCharge === 0 ? 'free-delivery' : ''}>
                                {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
                            </span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row summary-total">
                            <span>Total</span>
                            <span>{formatPrice(finalTotal)}</span>
                        </div>

                        {paymentMethod === 'cod' && (
                            <div className="summary-payable">
                                <span>Payable Now (25%)</span>
                                <span>{formatPrice(payableNow)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
