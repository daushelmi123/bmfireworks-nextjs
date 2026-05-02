'use client';

import { useState, useRef, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [added, setAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const videoRef = useRef(null);
  const { addToCart } = useCart();
  const videoUrl = product.video;

  // Share product handler
  const handleShare = async () => {
    const shareText = `Check out this firework! 🎆\n\n*${product.id}* - ${product.name}\n${product.nameChinese}\n*RM ${product.price.toFixed(2)}*\n\nVisit: ${window.location.origin}/products`;

    // Try native share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} - BMFireworks`,
          text: shareText,
          url: window.location.origin + '/products'
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2000);
      });
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setShowToast(true);
    setTimeout(() => setAdded(false), 1500);
    setTimeout(() => setShowToast(false), 2000);
  };

  const openVideoModal = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    if (showVideoModal && videoRef.current) {
      videoRef.current.play();
    }
  }, [showVideoModal]);

  return (
    <>
      {showToast && (
        <div className="cart-toast">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          <span>Added to cart!</span>
        </div>
      )}
      {shareToast && (
        <div className="share-toast">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          <span>Copied to clipboard!</span>
        </div>
      )}
      <div className="product-card-wrapper">
        {product.soldOut && <span className="sold-out-badge">Sold Out</span>}

        {videoUrl && (
          <div className="video-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}

        <div className="product-media">
          <div className="media-slide">
            {product.image ? (
              <img
                src={product.image}
                alt={`${product.name} ${product.nameChinese} - Premium Fireworks Malaysia BMFireworks`}
              />
            ) : (
              <div className="no-image-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" opacity="0.3">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
                <span>No Image</span>
              </div>
            )}
          </div>
        </div>

        <div className="product-content">
          <div className="product-header">
            <span className="product-id">{product.id}</span>
            <button className="share-btn" onClick={handleShare} title="Share product">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
              </svg>
            </button>
          </div>
          <h3>{product.name}</h3>
          <span className="chinese-name">{product.nameChinese}</span>
          <div className="product-price">
            <span className="price">RM {product.price.toFixed(2)}</span>
            {product.unit && <span className="unit">/ {product.unit}</span>}
          </div>

          {videoUrl && (
            <button className="video-btn" onClick={openVideoModal}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Video
            </button>
          )}

          <button
            className={`add-to-cart-btn ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={product.soldOut}
          >
            {added ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

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
              src={videoUrl}
              controls
              autoPlay
              loop
              playsInline
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
