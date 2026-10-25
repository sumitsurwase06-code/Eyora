import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MapPin, Mail, Phone, ShieldCheck } from 'lucide-react';
import { apiService } from '../../services/apiService';
import './Footer.css';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    try {
      const res = await apiService.subscribeNewsletter({ email });
      if (res.success) {
        setIsSubscribed(true);
        setMessage(res.message || 'Welcome to the Eyora Private Atelier.');
        setEmail('');
      }
    } catch {
      setMessage('Something went wrong. Please reach out to concierge.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="site-footer" aria-label="Eyora Haute Lunetterie Footer">
      {/* Top VIP Salon Invitation Banner */}
      <div className="footer-vip-banner">
        <div className="container-wide">
          <div className="vip-banner-inner">
            <div className="vip-text-wrap">
              <span className="eyebrow">THE PRIVATE SALON</span>
              <h3 className="vip-title">
                Receive invitations to private frame releases, private viewing salons, and bespoke commissions.
              </h3>
            </div>

            <form onSubmit={handleSubscribe} className="vip-form">
              {isSubscribed ? (
                <div className="vip-success-message">
                  <CheckCircle2 size={18} className="vip-success-icon" />
                  <span>{message}</span>
                </div>
              ) : (
                <div className="vip-input-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your confidential email..."
                    className="vip-input"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-solid-champagne vip-submit-btn"
                  >
                    <span>{isSubmitting ? 'ENROLLING...' : 'JOIN SALON'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Coordinates */}
      <div className="footer-main-area">
        <div className="container-wide">
          <div className="footer-grid">
            {/* Col 1: Brand & Heritage */}
            <div className="footer-brand-col">
              <Link to="/" className="footer-brand-logo">
                <span className="footer-brand-name">EYORA</span>
                <span className="footer-brand-sub">HAUTE LUNETTERIE & ATELIER</span>
              </Link>
              <p className="footer-brand-bio">
                Independent private-label lunetterie forged between Sabae, Fukui and Cadore, Italy. Sculptural spectacles and sun frames crafted without compromise.
              </p>
              <div className="footer-guarantee-pill">
                <ShieldCheck size={16} className="guarantee-icon" />
                <span>LIFETIME STRUCTURAL INTEGRITY WARRANTY</span>
              </div>
            </div>

            {/* Col 2: Collections */}
            <div className="footer-links-col">
              <h4 className="footer-col-title">COLLECTIONS</h4>
              <ul className="footer-links-list">
                <li><Link to="/collection?category=eyeglasses">Signature Eyeglasses</Link></li>
                <li><Link to="/collection?category=sunglasses">Sculpted Sunglasses</Link></li>
                <li><Link to="/collection?category=atelier">The Atelier Masterworks</Link></li>
                <li><Link to="/collection?shape=round">Panto & Round Classics</Link></li>
                <li><Link to="/collection?shape=geometric">Geometric Beta-Titanium</Link></li>
                <li><Link to="/collection">Archival Lookbook</Link></li>
              </ul>
            </div>

            {/* Col 3: Maison & Client Services */}
            <div className="footer-links-col">
              <h4 className="footer-col-title">MAISON & CONCIERGE</h4>
              <ul className="footer-links-list">
                <li><Link to="/our-story">Our Story & Lineage</Link></li>
                <li><Link to="/our-story#craftsmanship">The 52-Step Craftsmanship</Link></li>
                <li><Link to="/journal">The Editorial Journal</Link></li>
                <li><Link to="/our-story#fitting">Virtual Optical Consultation</Link></li>
                <li><Link to="/our-story#prescriptions">Prescription Lens Guide</Link></li>
                <li><Link to="/our-story#courier">White-Glove Global Delivery</Link></li>
              </ul>
            </div>

            {/* Col 4: Flagship Salons & Direct Concierge */}
            <div className="footer-links-col">
              <h4 className="footer-col-title">FLAGSHIP SALONS</h4>
              <div className="footer-boutiques-list">
                <div className="boutique-item">
                  <span className="boutique-city">MUMBAI FLAGSHIP</span>
                  <p className="boutique-address">Aura House, Apollo Bunder, Colaba</p>
                </div>

                <div className="boutique-item">
                  <span className="boutique-city">NEW DELHI ATELIER</span>
                  <p className="boutique-address">The Crescent at Qutab, Mehrauli</p>
                </div>

                <div className="boutique-item">
                  <span className="boutique-city">PARIS SHOWROOM</span>
                  <p className="boutique-address">Rue Saint-Honoré, 1er Arrondissement</p>
                </div>

                <div className="footer-direct-contact">
                  <a href="mailto:concierge@eyora-atelier.com" className="contact-link">
                    <Mail size={13} /> concierge@eyora-atelier.com
                  </a>
                  <a href="tel:+918000439672" className="contact-link">
                    <Phone size={13} /> +91 (0) 800-396-7200
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="separator-champagne" />

          {/* Bottom Copyright & Legal */}
          <div className="footer-bottom-bar">
            <p className="copyright-text">
              © {new Date().getFullYear()} EYORA HAUTE LUNETTERIE PRIVATE LIMITED. ALL RIGHTS RESERVED.
            </p>
            <div className="footer-legal-links">
              <a href="#privacy">CONFIDENTIALITY & PRIVACY</a>
              <span className="legal-dot">•</span>
              <a href="#terms">TERMS OF COMMISSION</a>
              <span className="legal-dot">•</span>
              <a href="#authenticity">AUTHENTICITY REGISTRATION</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
