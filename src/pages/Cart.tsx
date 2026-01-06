import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const deliveryCharge = cartTotal > 50000 ? 0 : 500;
    const finalTotal = cartTotal + deliveryCharge;

    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <div className="container section">
                    <div className="empty-cart">
                        <div className="empty-cart-icon">🛒</div>
                        <h2>Your cart is empty</h2>
                        <p>Add some products to get started!</p>
                        <Link to="/products" className="btn btn-primary btn-lg">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <div className="cart-header">
                    <h1 className="page-title">Shopping Cart</h1>
                    <p className="cart-count">{cart.length} items</p>
                </div>

                <div className="cart-content">
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        onError={(e) => {
                                            e.currentTarget.src = `https://via.placeholder.com/150x150/8B5CF6/FFFFFF?text=${encodeURIComponent(item.name)}`;
                                        }}
                                    />
                                </div>

                                <div className="cart-item-info">
                                    <Link to={`/products/${item.slug}`} className="cart-item-name">
                                        {item.name}
                                    </Link>
                                    <div className="cart-item-category">{item.category}</div>
                                    <div className="cart-item-price">
                                        {formatPrice(item.price)}
                                    </div>
                                </div>

                                <div className="cart-item-quantity">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        −
                                    </button>
                                    <span className="quantity-display">{item.quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="cart-item-total">
                                    {formatPrice(item.price * item.quantity)}
                                </div>

                                <button
                                    className="cart-item-remove"
                                    onClick={() => removeFromCart(item.id)}
                                    title="Remove item"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3 className="summary-title">Order Summary</h3>

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>

                        <div className="summary-row">
                            <span>Delivery Charges</span>
                            <span className={deliveryCharge === 0 ? 'free-delivery' : ''}>
                                {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
                            </span>
                        </div>

                        {deliveryCharge > 0 && (
                            <div className="delivery-info">
                                Add {formatPrice(50000 - cartTotal)} more for FREE delivery
                            </div>
                        )}

                        <div className="summary-divider"></div>

                        <div className="summary-row summary-total">
                            <span>Total</span>
                            <span>{formatPrice(finalTotal)}</span>
                        </div>

                        <button
                            className="btn btn-primary btn-lg checkout-btn"
                            onClick={() => navigate('/checkout')}
                        >
                            Proceed to Checkout
                        </button>

                        <Link to="/products" className="continue-shopping">
                            ← Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
