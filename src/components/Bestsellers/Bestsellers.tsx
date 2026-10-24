import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { apiService } from '../../services/apiService';
import { ProductCard } from '../ProductCard/ProductCard';
import './Bestsellers.css';

export const Bestsellers: React.FC = () => {
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const data = await apiService.getBestsellers();
        setBestsellers(data);
      } catch (err) {
        console.error('Failed to load bestsellers:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  return (
    <section className="bestsellers-section" aria-label="Bestselling Luxury Eyewear">
      <div className="bestsellers-ambient-glow" />

      <div className="container-wide">
        {/* Section Heading */}
        <div className="bestsellers-header">
          <div className="bestsellers-title-wrap">
            <span className="eyebrow">HIGH LUNETTERIE</span>
            <h2 className="bestsellers-heading">
              BESTSELLING <span className="font-editorial-italic">CREATIONS</span>
            </h2>
          </div>

          <div className="bestsellers-meta-wrap">
            <div className="bestsellers-award-pill">
              <Sparkles size={14} className="award-icon" />
              <span>SABAE HANDMADE ALLOCATIONS</span>
            </div>
            <Link to="/collection" className="link-editorial">
              EXPLORE FULL COLLECTION <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="bestsellers-loading">
            <span className="bestsellers-loader" />
            <p>Gathering atelier archive...</p>
          </div>
        ) : (
          <div className="bestsellers-grid">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Bottom Editorial Callout */}
        <div className="bestsellers-bottom-banner">
          <div className="bottom-banner-content">
            <span className="caption-label">COMPLIMENTARY CONCIERGE SERVICE</span>
            <h3 className="bottom-banner-title">
              Bespoke Virtual Fitting & Optical Consultation
            </h3>
            <p className="bottom-banner-desc">
              Uncertain about your face geometry or lens index? Connect directly with an Eyora master optician via video consultation or private salon booking.
            </p>
          </div>
          <Link to="/our-story" className="btn-secondary bottom-banner-btn">
            BOOK AN APPOINTMENT
          </Link>
        </div>
      </div>
    </section>
  );
};
