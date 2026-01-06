import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductBySlug } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import './ProductDetail.css';

const ProductDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const product = slug ? getProductBySlug(slug) : undefined;
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'highlights' | 'specifications'>('highlights');

    if (!product) {
        return (
            <div className="container section">
                <div className="not-found">
                    <h2>Product not found</h2>
                    <Link to="/products" className="btn btn-primary">
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        showToast(`${quantity} × ${product.name} added to cart!`, 'success');
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        navigate('/cart');
    };

    return (
        <div className="product-detail-page">
            {/* Breadcrumb */}
            <div className="breadcrumb container">
                <Link to="/">Home</Link>
                <span className="breadcrumb-separator">›</span>
                <Link to="/products">Products</Link>
                <span className="breadcrumb-separator">›</span>
                <Link to={`/products?category=${product.category}`}>
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Link>
                <span className="breadcrumb-separator">›</span>
                <span className="breadcrumb-current">{product.name}</span>
            </div>

            <div className="product-detail-content container">
                {/* Image Gallery */}
                <div className="product-gallery">
                    <div className="gallery-main">
                        <img
                            src={product.images[selectedImage]}
                            alt={product.name}
                            className="gallery-main-image"
                            onError={(e) => {
                                e.currentTarget.src = `https://via.placeholder.com/600x600/8B5CF6/FFFFFF?text=${encodeURIComponent(product.name)}`;
                            }}
                        />
                        {product.discount && (
                            <span className="product-discount-badge badge-discount">
                                {product.discount}% OFF
                            </span>
                        )}
                    </div>
                    <div className="gallery-thumbnails">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                className={`gallery-thumbnail ${selectedImage === index ? 'active' : ''}`}
                                onClick={() => setSelectedImage(index)}
                            >
                                <img
                                    src={image}
                                    alt={`${product.name} ${index + 1}`}
                                    onError={(e) => {
                                        e.currentTarget.src = `https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=${index + 1}`;
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="product-info-section">
                    <div className="product-category-badge">{product.category}</div>
                    <h1 className="product-title">{product.name}</h1>

                    <div className="product-rating-section">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <span
                                    key={i}
                                    className={i < Math.floor(product.rating) ? 'star filled' : 'star'}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <span className="rating-text">
                            {product.rating} ({product.reviews} reviews)
                        </span>
                    </div>

                    <div className="product-pricing-section">
                        <div className="price-main">{formatPrice(product.price)}</div>
                        {product.originalPrice && (
                            <div className="price-details">
                                <span className="price-original">{formatPrice(product.originalPrice)}</span>
                                <span className="price-savings">
                                    Save {formatPrice(product.originalPrice - product.price)}
                                </span>
                            </div>
                        )}
                    </div>

                    <p className="product-description">{product.description}</p>

                    <div className="product-stock">
                        {product.inStock ? (
                            <span className="stock-available">✓ In Stock</span>
                        ) : (
                            <span className="stock-unavailable">✗ Out of Stock</span>
                        )}
                    </div>

                    <div className="product-quantity">
                        <label className="quantity-label">Quantity:</label>
                        <div className="quantity-selector">
                            <button
                                className="quantity-btn"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                −
                            </button>
                            <input
                                type="number"
                                className="quantity-input"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                min="1"
                            />
                            <button
                                className="quantity-btn"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="product-actions">
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                        >
                            Add to Cart
                        </button>
                        <button
                            className="btn btn-accent btn-lg"
                            onClick={handleBuyNow}
                            disabled={!product.inStock}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="product-tabs-section container">
                <div className="tabs-header">
                    <button
                        className={`tab-button ${activeTab === 'highlights' ? 'active' : ''}`}
                        onClick={() => setActiveTab('highlights')}
                    >
                        Highlights
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'specifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('specifications')}
                    >
                        Specifications
                    </button>
                </div>

                <div className="tabs-content">
                    {activeTab === 'highlights' && (
                        <div className="highlights-content">
                            <ul className="highlights-list">
                                {product.highlights.map((highlight, index) => (
                                    <li key={index} className="highlight-item">
                                        <span className="highlight-icon">✓</span>
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === 'specifications' && (
                        <div className="specifications-content">
                            <table className="specifications-table">
                                <tbody>
                                    {product.specifications.map((spec, index) => (
                                        <tr key={index} className="spec-row">
                                            <td className="spec-label">{spec.label}</td>
                                            <td className="spec-value">{spec.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
