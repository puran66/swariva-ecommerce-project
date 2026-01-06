import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
    const featuredProducts = getFeaturedProducts();

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content container">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Luxury Meets
                            <span className="gradient-text"> Innovation</span>
                        </h1>
                        <p className="hero-subtitle">
                            Discover our exquisite collection of premium jewelry, cutting-edge earbuds,
                            and smart gadgets. Elevate your lifestyle with Swariva.
                        </p>
                        <div className="hero-actions">
                            <Link to="/products" className="btn btn-primary btn-lg">
                                Explore Collection
                            </Link>
                            <Link to="/products?category=jewelry" className="btn btn-outline btn-lg">
                                View Jewelry
                            </Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <div className="hero-image-wrapper">
                            <div className="floating-card card-1">
                                <span className="floating-icon">💎</span>
                            </div>
                            <div className="floating-card card-2">
                                <span className="floating-icon">🎧</span>
                            </div>
                            <div className="floating-card card-3">
                                <span className="floating-icon">⌚</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories section">
                <div className="container">
                    <h2 className="section-title text-center">Shop by Category</h2>
                    <div className="categories-grid">
                        <Link to="/products?category=jewelry" className="category-card">
                            <div className="category-icon">💎</div>
                            <h3 className="category-title">Jewelry</h3>
                            <p className="category-description">
                                Timeless elegance in gold, diamonds, and precious gems
                            </p>
                            <span className="category-link">
                                Explore Jewelry →
                            </span>
                        </Link>

                        <Link to="/products?category=earbuds" className="category-card">
                            <div className="category-icon">🎧</div>
                            <h3 className="category-title">Earbuds</h3>
                            <p className="category-description">
                                Premium audio experience with cutting-edge technology
                            </p>
                            <span className="category-link">
                                Explore Earbuds →
                            </span>
                        </Link>

                        <Link to="/products?category=gadgets" className="category-card">
                            <div className="category-icon">⚡</div>
                            <h3 className="category-title">Smart Gadgets</h3>
                            <p className="category-description">
                                Innovative devices to enhance your daily life
                            </p>
                            <span className="category-link">
                                Explore Gadgets →
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Products</h2>
                        <Link to="/products" className="btn btn-secondary">
                            View All Products
                        </Link>
                    </div>
                    <div className="products-grid">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="trust-badges section">
                <div className="container">
                    <div className="badges-grid">
                        <div className="trust-badge">
                            <div className="trust-icon">🔒</div>
                            <h4 className="trust-title">Secure Payments</h4>
                            <p className="trust-description">100% secure transactions</p>
                        </div>
                        <div className="trust-badge">
                            <div className="trust-icon">🚚</div>
                            <h4 className="trust-title">Fast Delivery</h4>
                            <p className="trust-description">Express shipping available</p>
                        </div>
                        <div className="trust-badge">
                            <div className="trust-icon">💰</div>
                            <h4 className="trust-title">COD Available</h4>
                            <p className="trust-description">Pay on delivery option</p>
                        </div>
                        <div className="trust-badge">
                            <div className="trust-icon">✨</div>
                            <h4 className="trust-title">Premium Quality</h4>
                            <p className="trust-description">Certified authentic products</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
