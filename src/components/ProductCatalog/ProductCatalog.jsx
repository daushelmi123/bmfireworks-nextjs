'use client';

import Link from 'next/link';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { productVideos } from '@/data/productVideos';
import { useState, useRef, useEffect } from 'react';
import './ProductCatalog.css';

const ProductCatalog = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const videoRef = useRef(null);

  const openVideoModal = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setCurrentVideo('');
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    if (showVideoModal && videoRef.current) {
      videoRef.current.play();
    }
  }, [showVideoModal]);

  // Get categories (exclude 'all')
  const displayCategories = categories.filter(cat => cat.id !== 'all');

  // Get max 8 products per category
  const getCategoryProducts = (categoryId) => {
    return products.filter(p => p.category === categoryId).slice(0, 8);
  };

  return (
    <section id="products" className="product-catalog">
      <div className="container">
        <h2>Our Products</h2>
        <p className="section-subtitle">Browse our complete range of premium quality fireworks</p>

        {/* All Categories Display */}
        <div className="all-categories">
          {displayCategories.map(category => {
            const categoryProducts = getCategoryProducts(category.id);
            if (categoryProducts.length === 0) return null;

            return (
              <div key={category.id} className="category-block">
                <div className="category-block-header">
                  <div className="category-block-title">
                    <h3>{category.name}</h3>
                    <span className="category-chinese-label">{category.nameChinese}</span>
                    <span className="product-count-badge">
                      {products.filter(p => p.category === category.id).length} items
                    </span>
                  </div>
                  <Link
                    href={`/products?category=${category.id}`}
                    className="view-all-category-btn"
                  >
                    View All
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>

                <div className="category-products-row">
                  {categoryProducts.map(product => {
                    const videoUrl = productVideos[product.id];
                    return (
                      <div key={product.id} className="product-card-compact">
                        {product.soldOut && <span className="sold-out-badge">Sold Out</span>}
                        {videoUrl && (
                          <div className="video-indicator">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        )}
                        <div className="product-image">
                          <img
                            src={product.image}
                            alt={`${product.name} ${product.nameChinese}`}
                            loading="lazy"
                          />
                        </div>
                        <div className="product-info">
                          <span className="product-id">{product.id}</span>
                          <h4>{product.name}</h4>
                          <span className="chinese-name">{product.nameChinese}</span>
                          {videoUrl && (
                            <button
                              className="watch-video-btn"
                              onClick={() => openVideoModal(videoUrl)}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                              Watch Video
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="view-all-container">
          <Link href="/products" className="view-all-btn">
            Browse All Products
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="video-modal-overlay" onClick={closeVideoModal}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeVideoModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <video
              ref={videoRef}
              src={currentVideo}
              controls
              autoPlay
              loop
              playsInline
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductCatalog;
