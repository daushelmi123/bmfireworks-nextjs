'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.a
          href="https://wa.me/601112460415?text=Hi%20BMFireworks!%20Saya%20nak%20order%20bunga%20api.%20Boleh%20bagi%20quotation?"
          target="_blank"
          rel="noopener noreferrer"
          className="permit-announcement"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <span className="permit-icon">🎆</span>
          <span>ORDER SEKARANG - Free Delivery* untuk order RM500 ke atas!</span>
          <span className="permit-arrow">→</span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="hero-badge"
        >
          ✨ Premium Quality Fireworks
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          BMFireworks X Bearboom
          <span className="gradient-text"> Licensed Fireworks Distributor Malaysia</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="hero-description"
        >
          Licensed fireworks distributor for weddings, corporate events & celebrations.
          100% Legal • PDRM Licensed • Delivery across Peninsular Malaysia.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link href="/products" className="btn btn-primary">
            <span>Watch Videos</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </Link>
          <Link href="/products" className="btn btn-secondary">
            <span>View Catalog</span>
          </Link>
        </motion.div>

        <motion.div
          className="hero-warehouse"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="warehouse-image-container">
            <img
              src="/images/bm-loading.jpg"
              alt="BMFireworks Licensed Fireworks Distributor Malaysia - Warehouse Loading Operations Raya CNY 2026"
              className="warehouse-image"
            />
            <div className="warehouse-overlay">
              <div className="warehouse-text">
                <h3>Loading Last Pallets</h3>
                <p>Fast-moving stock for Raya & CNY celebrations</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="stat">
            <h3>5+</h3>
            <p>Years Experience</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <h3>100+</h3>
            <p>Quality Products</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <h3>100%</h3>
            <p>Customer Satisfaction</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
