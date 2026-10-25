import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useSearch } from '../../context/SearchContext';
import './Header.css';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();

  const { totalItemsCount, openCart } = useCart();
  const { totalWishlistCount, openWishlist } = useWishlist();
  const { openSearch } = useSearch();

  const isHomepage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [location.pathname]);

  const headerClass = `site-header ${
    !isHomepage || isScrolled ? 'site-header--solid' : 'site-header--transparent'
  }`;

  return (
    <header className={headerClass}>
      <div className="container-wide header-inner">
        {/* Left: Brand Identity */}
        <div className="header-brand-wrap">
          <Link to="/" className="brand-logo" aria-label="Eyora Haute Lunetterie Homepage">
            <span className="brand-name">EYORA</span>
            <span className="brand-sub">ATELIER LUNETTERIE</span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                HOME
              </Link>
            </li>

            {/* Collection with Mega Menu */}
            <li
              className="nav-item has-dropdown"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <Link
                to="/collection"
                className={`nav-link ${location.pathname === '/collection' ? 'active' : ''}`}
              >
                COLLECTION
                <ChevronDown size={14} className={`dropdown-icon ${isMegaMenuOpen ? 'open' : ''}`} />
              </Link>

              {/* Mega Menu Dropdown */}
              <div className={`mega-menu ${isMegaMenuOpen ? 'visible' : ''}`}>
                <div className="mega-menu-inner">
                  <div className="mega-col">
                    <span className="mega-label">BY CATEGORY</span>
                    <ul className="mega-links">
                      <li>
                        <Link to="/collection?category=eyeglasses">Optical Spectacles</Link>
                      </li>
                      <li>
                        <Link to="/collection?category=sunglasses">Sun Lunettes</Link>
                      </li>
                      <li>
                        <Link to="/collection?category=atelier">The Atelier Masterworks</Link>
                      </li>
                      <li>
                        <Link to="/collection">Complete Archive</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mega-col">
                    <span className="mega-label">BY GEOMETRY</span>
                    <ul className="mega-links">
                      <li>
                        <Link to="/collection?shape=round">Round & Panto</Link>
                      </li>
                      <li>
                        <Link to="/collection?shape=geometric">Hexagonal & Polygonal</Link>
                      </li>
                      <li>
                        <Link to="/collection?shape=square">Architectural Square</Link>
                      </li>
                      <li>
                        <Link to="/collection?shape=cat-eye">Sculpted Cat-Eye</Link>
                      </li>
                      <li>
                        <Link to="/collection?shape=aviator">Pilot Double-Bridge</Link>
                      </li>
                    </ul>
                  </div>

                  {/* Featured Spotlight Card */}
                  <div className="mega-spotlight">
                    <div className="mega-spotlight-image-wrap">
                      <img
                        src="/images/sculpted-sunglasses.jpg"
                        alt="Sculpted sunglasses campaign"
                        className="mega-spotlight-img"
                      />
                      <div className="mega-spotlight-overlay" />
                    </div>
                    <div className="mega-spotlight-content">
                      <span className="eyebrow eyebrow-no-line">CAMPAIGN HIGHLIGHT</span>
                      <h4 className="mega-spotlight-title">Soleil D’Or Havana</h4>
                      <Link to="/collection?category=sunglasses" className="link-editorial">
                        EXPLORE SUNGLASSES <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <Link
                to="/collection?category=eyeglasses"
                className="nav-link"
              >
                EYEGLASSES
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/collection?category=sunglasses"
                className="nav-link"
              >
                SUNGLASSES
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/our-story"
                className={`nav-link ${location.pathname === '/our-story' ? 'active' : ''}`}
              >
                OUR STORY
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/journal"
                className={`nav-link ${location.pathname === '/journal' ? 'active' : ''}`}
              >
                JOURNAL
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right: Actions */}
        <div className="header-actions">
          {/* Search Trigger */}
          <button
            onClick={openSearch}
            className="action-btn"
            aria-label="Open search dialog"
            title="Search eyewear"
          >
            <Search size={19} />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={openWishlist}
            className="action-btn"
            aria-label={`Wishlist with ${totalWishlistCount} items`}
            title="View saved pieces"
          >
            <Heart size={19} />
            {totalWishlistCount > 0 && (
              <span className="badge-counter">{totalWishlistCount}</span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            className="action-btn cart-trigger"
            aria-label={`Shopping bag with ${totalItemsCount} items`}
            title="View shopping bag"
          >
            <ShoppingBag size={19} />
            {totalItemsCount > 0 && (
              <span className="badge-counter">{totalItemsCount}</span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="action-btn mobile-menu-btn"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <div className="mobile-nav-brand">
            <span className="brand-name">EYORA</span>
            <span className="brand-sub">ATELIER LUNETTERIE</span>
          </div>

          <ul className="mobile-nav-list">
            <li>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                HOME
              </Link>
            </li>
            <li>
              <Link to="/collection" onClick={() => setIsMobileMenuOpen(false)}>
                ALL EYEWEAR
              </Link>
            </li>
            <li>
              <Link to="/collection?category=eyeglasses" onClick={() => setIsMobileMenuOpen(false)}>
                OPTICAL EYEGLASSES
              </Link>
            </li>
            <li>
              <Link to="/collection?category=sunglasses" onClick={() => setIsMobileMenuOpen(false)}>
                SUNGLASSES
              </Link>
            </li>
            <li>
              <Link to="/collection?category=atelier" onClick={() => setIsMobileMenuOpen(false)}>
                THE ATELIER MASTERWORKS
              </Link>
            </li>
            <li>
              <Link to="/our-story" onClick={() => setIsMobileMenuOpen(false)}>
                OUR STORY & CRAFT
              </Link>
            </li>
            <li>
              <Link to="/journal" onClick={() => setIsMobileMenuOpen(false)}>
                EDITORIAL JOURNAL
              </Link>
            </li>
          </ul>

          <div className="mobile-nav-footer">
            <div className="mobile-contact-note">
              <span className="caption-label">FLAGSHIP CONCIERGE</span>
              <p>Maison Eyora, Colaba, Mumbai</p>
              <a href="tel:+918000439672" className="mobile-phone">+91 (0) 800-EYORA</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
