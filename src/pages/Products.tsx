import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('featured');

    useEffect(() => {
        const category = searchParams.get('category') || 'all';
        setSelectedCategory(category);

        let filtered = getProductsByCategory(category);

        // Apply sorting
        if (sortBy === 'price-low') {
            filtered = [...filtered].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered = [...filtered].sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        }

        setFilteredProducts(filtered);
    }, [searchParams, sortBy]);

    const handleCategoryChange = (category: string) => {
        if (category === 'all') {
            setSearchParams({});
        } else {
            setSearchParams({ category });
        }
    };

    return (
        <div className="products-page">
            <div className="products-header">
                <div className="container">
                    <h1 className="page-title">Our Collection</h1>
                    <p className="page-subtitle">
                        Discover premium products across jewelry, earbuds, and smart gadgets
                    </p>
                </div>
            </div>

            <div className="products-content container">
                <aside className="products-sidebar">
                    <div className="filter-section">
                        <h3 className="filter-title">Categories</h3>
                        <div className="filter-options">
                            <button
                                className={`filter-option ${selectedCategory === 'all' ? 'active' : ''}`}
                                onClick={() => handleCategoryChange('all')}
                            >
                                All Products
                                <span className="filter-count">{products.length}</span>
                            </button>
                            <button
                                className={`filter-option ${selectedCategory === 'jewelry' ? 'active' : ''}`}
                                onClick={() => handleCategoryChange('jewelry')}
                            >
                                💎 Jewelry
                                <span className="filter-count">
                                    {products.filter(p => p.category === 'jewelry').length}
                                </span>
                            </button>
                            <button
                                className={`filter-option ${selectedCategory === 'earbuds' ? 'active' : ''}`}
                                onClick={() => handleCategoryChange('earbuds')}
                            >
                                🎧 Earbuds
                                <span className="filter-count">
                                    {products.filter(p => p.category === 'earbuds').length}
                                </span>
                            </button>
                            <button
                                className={`filter-option ${selectedCategory === 'gadgets' ? 'active' : ''}`}
                                onClick={() => handleCategoryChange('gadgets')}
                            >
                                ⚡ Smart Gadgets
                                <span className="filter-count">
                                    {products.filter(p => p.category === 'gadgets').length}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3 className="filter-title">Sort By</h3>
                        <select
                            className="form-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>
                </aside>

                <main className="products-main">
                    <div className="products-toolbar">
                        <p className="products-count">
                            Showing <strong>{filteredProducts.length}</strong> products
                        </p>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="products-grid">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-products">
                            <div className="no-products-icon">🔍</div>
                            <h3>No products found</h3>
                            <p>Try adjusting your filters</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Products;
