'use client';

import { motion } from 'framer-motion';
import './ServiceArea.css';

const ServiceArea = () => {
  const states = [
    { name: 'Perlis', icon: '📍' },
    { name: 'Kedah', icon: '📍' },
    { name: 'Pulau Pinang', icon: '📍' },
    { name: 'Perak', icon: '📍' },
    { name: 'Kelantan', icon: '📍' },
    { name: 'Terengganu', icon: '📍' },
    { name: 'Pahang', icon: '📍' },
    { name: 'Selangor', icon: '📍' },
    { name: 'Kuala Lumpur', icon: '🏙️' },
    { name: 'Putrajaya', icon: '🏛️' },
    { name: 'Negeri Sembilan', icon: '📍' },
    { name: 'Melaka', icon: '📍' },
    { name: 'Johor', icon: '📍' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <section className="service-area" id="service-area">
      <div className="container">
        <motion.div
          className="service-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Nationwide Delivery</h2>
          <p className="service-subtitle">
            We deliver across Peninsular Malaysia - Fast & reliable service to all states
          </p>
        </motion.div>

        <motion.div
          className="states-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {states.map((state, index) => (
            <motion.div
              key={index}
              className="state-card"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 8px 25px rgba(0, 206, 209, 0.25)'
              }}
            >
              <span className="state-icon">{state.icon}</span>
              <span className="state-name">{state.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="coverage-info"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="info-badge">
            <span className="badge-icon">🚚</span>
            <div className="badge-text">
              <strong>Peninsula-Wide Coverage</strong>
              <p>Professional delivery to all 13 states in Peninsular Malaysia</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceArea;
