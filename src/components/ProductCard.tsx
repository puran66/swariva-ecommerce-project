import { Link } from 'react-router-dom';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';
import './ProductCard.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product);
        showToast(`${product.name} added to cart!`, 'success');
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <Link to={`/products/${product.slug}`} className="product-card">
            <div className="product-image-wrapper">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=${encodeURIComponent(product.name)}`;
                    }}
                />
                {product.discount && (
                    <span className="product-discount badge-discount">
                        {product.discount}% OFF
                    </span>
                )}
                {!product.inStock && (
                    <span className="product-stock-badge">Out of Stock</span>
                )}
            </div>

            <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>

                <div className="product-rating">
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
                        {product.rating} ({product.reviews})
                    </span>
                </div>

                <div className="product-pricing">
                    <span className="product-price">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                        <span className="product-original-price">
                            {formatPrice(product.originalPrice)}
                        </span>
                    )}
                </div>

                <button
                    className="btn btn-primary btn-add-cart"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </Link>
    );
};

export default ProductCard;
