'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import ProductCard from '@/components/ProductCard/ProductCard';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import '../ProductsPage.css';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Set category from URL parameter on mount
  useEffect(() => {
    if (categoryParam && categories.some(c => c.id === categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = searchTerm === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.nameChinese.includes(searchTerm) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const categoryCounts = useMemo(() => {
    const counts = { all: products.length };
    categories.forEach(cat => {
      if (cat.id !== 'all') {
        counts[cat.id] = products.filter(p => p.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  return (
    <>
      <div className="products-header">
        <div className="header-watermark"></div>
        <h1>Product Catalog</h1>
        <p>Browse our complete collection of high-quality fireworks</p>
      </div>

      <div className="products-container">
        <div className="products-sidebar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="mobile-category-dropdown">
            <button
              className={`category-dropdown-btn ${dropdownOpen ? 'open' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>{categories.find(c => c.id === activeCategory)?.name || 'All Products'}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>
            <div className={`category-dropdown-list ${dropdownOpen ? 'open' : ''}`}>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`dropdown-category-item ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setDropdownOpen(false);
                  }}
                >
                  <span className="dropdown-cat-name">{cat.name}</span>
                  <span className="dropdown-cat-count">{categoryCounts[cat.id]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="category-list">
            <h3>Categories</h3>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-item ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="cat-name">{cat.name}</span>
                <span className="cat-chinese">{cat.nameChinese}</span>
                <span className="cat-count">{categoryCounts[cat.id]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="products-main">
          <div className="products-info">
            <span>Showing {filteredProducts.length} products</span>
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-results">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function ProductsPage() {
  return (
    <div className="products-page">
      <Navbar />
      <Suspense fallback={<div style={{ padding: '100px 20px', textAlign: 'center' }}>Loading products...</div>}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
