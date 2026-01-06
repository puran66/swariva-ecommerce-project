import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
    const { cartCount } = useCart();
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <header className="header">
            <div className="header-container container">
                <Link to="/" className="logo" onClick={scrollToTop}>
                    <span className="logo-text">Swariva</span>
                    <span className="logo-tagline">Premium Collection</span>
                </Link>

                <nav className="nav">
                    <Link
                        to="/"
                        className={`nav-link ${isActive('/') ? 'active' : ''}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/products"
                        className={`nav-link ${isActive('/products') ? 'active' : ''}`}
                    >
                        All Products
                    </Link>
                    <Link
                        to="/products?category=jewelry"
                        className={`nav-link ${location.search.includes('jewelry') ? 'active' : ''}`}
                    >
                        Jewelry
                    </Link>
                    <Link
                        to="/products?category=earbuds"
                        className={`nav-link ${location.search.includes('earbuds') ? 'active' : ''}`}
                    >
                        Earbuds
                    </Link>
                    <Link
                        to="/products?category=gadgets"
                        className={`nav-link ${location.search.includes('gadgets') ? 'active' : ''}`}
                    >
                        Gadgets
                    </Link>
                </nav>

                <div className="header-actions">
                    <Link to="/login" className="btn btn-secondary btn-sm">
                        Login
                    </Link>
                    <Link to="/cart" className="cart-button">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="cart-badge">{cartCount}</span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
