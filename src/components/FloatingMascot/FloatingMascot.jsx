'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import './FloatingMascot.css';

const FloatingMascot = ({ position = 'hero', size = 'medium', whatsappNumber = '601112460415' }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Different animation variants for different positions
  const variants = {
    hero: {
      initial: { opacity: 0, scale: 0, rotate: -180 },
      animate: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
          duration: 1,
          ease: "easeOut"
        }
      },
      float: {
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    corner: {
      initial: { opacity: 0, x: 50 },
      animate: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8
        }
      },
      float: {
        y: [0, -15, 0],
        x: [0, 10, 0],
        rotate: [0, -5, 5, 0],
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    inline: {
      initial: { opacity: 0, scale: 0.8 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.6
        }
      },
      float: {
        y: [0, -10, 0],
        scale: [1, 1.05, 1],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  };

  const sizeClasses = {
    small: 'mascot-small',
    medium: 'mascot-medium',
    large: 'mascot-large'
  };

  const positionClasses = {
    hero: 'mascot-hero',
    corner: 'mascot-corner',
    inline: 'mascot-inline'
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi BMFireworks! I'm interested in your products.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  // For corner mascot, make it a WhatsApp button
  if (position === 'corner') {
    return (
      <motion.div
        className={`floating-mascot ${positionClasses[position]} ${sizeClasses[size]} whatsapp-mascot`}
        initial={variants[position].initial}
        animate={[variants[position].animate, variants[position].float]}
        whileHover={{ scale: 1.1 }}
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <img
          src="/images/mascot.png"
          alt="Contact BMFireworks Malaysia WhatsApp Premium Fireworks"
          className="mascot-image"
        />

        {showTooltip && (
          <motion.div
            className="whatsapp-tooltip"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="tooltip-content">
              <span className="whatsapp-icon">💬</span>
              <div>
                <strong>Chat with us!</strong>
                <p>Click to WhatsApp BMFireworks</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="whatsapp-badge">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
      </motion.div>
    );
  }

  // For hero and inline mascots, just decorative
  return (
    <motion.div
      className={`floating-mascot ${positionClasses[position]} ${sizeClasses[size]}`}
      initial={variants[position].initial}
      animate={[variants[position].animate, variants[position].float]}
      whileHover={{ scale: 1.1, rotate: 10 }}
    >
      <img
        src="/images/mascot.png"
        alt="BMFireworks Malaysia Premium Fireworks Mascot"
        className="mascot-image"
        onError={(e) => {
          e.target.style.display = 'none';
          const placeholder = document.createElement('div');
          placeholder.className = 'mascot-placeholder';
          placeholder.textContent = '🎆';
          e.target.parentElement.appendChild(placeholder);
        }}
      />
    </motion.div>
  );
};

export default FloatingMascot;
