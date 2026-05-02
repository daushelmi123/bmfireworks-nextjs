'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import CartIcon from '../Icons/CartIcon';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCartCount } = useCart();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {menuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="logo">
            <img src="/images/mascot.png" alt="BMFireworks Malaysia Licensed Premium Fireworks Distributor Logo" className="logo-image" />
            <span>BMFireworks</span>
          </Link>

          <div className="nav-right">
            <Link href="/checkout" className="cart-link-mobile">
              <CartIcon size={24} />
              {getCartCount() > 0 && <span className="cart-count">{getCartCount()}</span>}
            </Link>
            <button
              className={`hamburger ${menuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <li><Link href="/" onClick={closeMenu}>Home</Link></li>
            <li><Link href="/products" onClick={closeMenu}>Products</Link></li>
            <li><Link href="/about" onClick={closeMenu}>About</Link></li>
            <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
            <li className="desktop-cart">
              <Link href="/checkout" onClick={closeMenu} className="cart-link">
                <CartIcon size={20} />
                {getCartCount() > 0 && <span className="cart-count">{getCartCount()}</span>}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
