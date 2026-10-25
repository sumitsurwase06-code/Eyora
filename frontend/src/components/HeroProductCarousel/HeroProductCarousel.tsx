import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Heart,
  Eye,
  ShoppingBag,
  Sparkles,
  Check,
  Compass,
} from 'lucide-react';
import { Product, ColorVariant } from '../../types';
import { PRODUCTS } from '../../data/products';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useQuickView } from '../../context/QuickViewContext';
import { formatINR, formatOpticalSize } from '../../utils/formatters';
import './HeroProductCarousel.css';

export interface HeroProductCarouselProps {
  products?: Product[];
  autoPlayInterval?: number; // in milliseconds
  autoPlay?: boolean;
  className?: string;
}

// Curate luxury signature products for the hero campaign if not passed as props
const DEFAULT_HERO_PRODUCTS = PRODUCTS.filter(
  (p) =>
    p.id === 'eyora-aurelius-01' ||
    p.id === 'eyora-soleil-dor' ||
    p.id === 'eyora-monolith-04' ||
    p.id === 'eyora-valkyrie-champagne' ||
    p.id === 'eyora-atelier-calibre-88' ||
    p.id === 'eyora-nero-aviateur' ||
    p.id === 'eyora-palais-royal'
);

// Fallback to top products if filtering is empty
const INITIAL_PRODUCTS = DEFAULT_HERO_PRODUCTS.length > 0 ? DEFAULT_HERO_PRODUCTS : PRODUCTS.slice(0, 6);

// Atelier coordinates corresponding to craftsmanship origin
const ATELIER_COORDINATES: Record<string, string> = {
  titanium: 'SABAE, FUKUI • LAT 35.9431° N, 136.1852° E',
  acetate: 'CADORE, VENETO • LAT 46.4328° N, 12.3789° E',
  horn: 'SABAE ATELIER LAB • LAT 35.9431° N, 136.1852° E',
  mixed: 'MILAN DESIGN LAB • LAT 45.4642° N, 9.1900° E',
};

export const HeroProductCarousel: React.FC<HeroProductCarouselProps> = ({
  products = INITIAL_PRODUCTS,
  autoPlayInterval = 6500,
  autoPlay = true,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedColorOverride, setSelectedColorOverride] = useState<ColorVariant | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cartFeedback, setCartFeedback] = useState(false);

  // 3D Tilt perspective effect state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Drag / swipe states for horizontal strip
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Context integrations
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart, openCart } = useCart();
  const { openQuickView } = useQuickView();

  const activeProduct = products[currentIndex] || products[0];
  const isSaved = activeProduct ? isInWishlist(activeProduct.id) : false;
  const selectedColor = selectedColorOverride || (activeProduct?.colors?.[0] ?? null);

  // Handle slide transitions with micro-delay for smooth animation
  const goToIndex = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setIsTransitioning(true);
      setProgress(0);
      setSelectedColorOverride(null);

      const targetIndex = (index + products.length) % products.length;
      setCurrentIndex(targetIndex);

      // Trigger transition state duration
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 550);

      return () => clearTimeout(timer);
    },
    [currentIndex, products.length]
  );

  const goToNext = useCallback(() => {
    goToIndex(currentIndex + 1);
  }, [currentIndex, goToIndex]);

  const goToPrev = useCallback(() => {
    goToIndex(currentIndex - 1);
  }, [currentIndex, goToIndex]);

  // Autoplay timer with progress bar calculation
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const stepMs = 50;
    const progressIncrement = (stepMs / autoPlayInterval) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + progressIncrement;
      });
    }, stepMs);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, autoPlayInterval, goToNext]);

  // Center active thumbnail in the horizontal strip
  useEffect(() => {
    if (!trackRef.current) return;
    const activeThumbnail = trackRef.current.children[currentIndex] as HTMLElement;
    if (activeThumbnail) {
      const containerWidth = trackRef.current.clientWidth;
      const thumbLeft = activeThumbnail.offsetLeft;
      const thumbWidth = activeThumbnail.clientWidth;
      trackRef.current.scrollTo({
        left: thumbLeft - containerWidth / 2 + thumbWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  // 3D Tilt calculation on mouse move
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -6; // max -6 to +6 deg
    const tiltY = ((x - centerX) / centerX) * 6; // max -6 to +6 deg
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleStageMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Direct add to cart handler
  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeProduct) return;
    const colorToUse = selectedColor || activeProduct.colors[0];
    addToCart(activeProduct, colorToUse);
    setCartFeedback(true);
    setTimeout(() => {
      setCartFeedback(false);
      openCart();
    }, 600);
  };

  // Horizontal strip mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftRef.current = trackRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const activeImage = selectedColor?.image || activeProduct?.defaultImage || '';
  const coordinateLabel =
    ATELIER_COORDINATES[activeProduct?.materialType || 'titanium'] ||
    'SABAE ATELIER LAB • LAT 35.9431° N, 136.1852° E';

  return (
    <div
      className={`hero-product-carousel ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleStageMouseLeave}
      aria-label="Eyora Haute Lunetterie Cinematic Carousel"
    >
      {/* Dynamic Ambient Background Glow matched to product */}
      <div
        className="carousel-ambient-glow"
        style={{
          background:
            activeProduct?.materialType === 'titanium'
              ? 'radial-gradient(circle at 60% 40%, rgba(233, 201, 154, 0.28) 0%, rgba(217, 145, 75, 0.12) 45%, transparent 70%)'
              : activeProduct?.shape === 'cat-eye'
              ? 'radial-gradient(circle at 60% 40%, rgba(217, 145, 75, 0.32) 0%, rgba(185, 111, 63, 0.14) 50%, transparent 75%)'
              : 'radial-gradient(circle at 60% 40%, rgba(185, 111, 63, 0.25) 0%, rgba(56, 37, 31, 0.2) 55%, transparent 75%)',
        }}
      />

      {/* Main Showcase Stage */}
      <div
        className="carousel-main-stage"
        onMouseMove={handleStageMouseMove}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Editorial Top Origin & Coordinate Marker */}
        <div className="carousel-stage-header">
          <div className="carousel-atelier-origin">
            <Compass size={12} className="origin-icon" />
            <span>{coordinateLabel}</span>
          </div>

          <div className="carousel-edition-tag">
            <span>PIÈCE {String(currentIndex + 1).padStart(2, '0')} DE {String(products.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Featured Eyewear Visual Container */}
        <div className="carousel-product-display">
          <div className={`product-visual-wrapper ${isTransitioning ? 'is-shifting' : ''}`}>
            {/* Specular Light Sweep Overlay */}
            <div className="carousel-light-sweep" />

            <Link
              to={`/product/${activeProduct?.slug}`}
              className="carousel-image-anchor"
              aria-label={`Explore frame specifications for ${activeProduct?.name}`}
            >
              <img
                src={activeImage}
                alt={`${activeProduct?.name} - ${selectedColor?.name || activeProduct?.subtitle}`}
                className="carousel-product-image"
                loading="eager"
              />
            </Link>

            {/* Micro Badges Over Image */}
            <div className="carousel-badge-cluster">
              {activeProduct?.badge && (
                <span className="carousel-status-badge">
                  <Sparkles size={11} className="badge-sparkle-icon" />
                  {activeProduct.badge}
                </span>
              )}
              {activeProduct?.isBestseller && !activeProduct?.badge && (
                <span className="carousel-status-badge">SIGNATURE ARCHIVE</span>
              )}
            </div>

            {/* Quick Action Floating Controls */}
            <div className="carousel-quick-actions" aria-label="Product quick interactions">
              <button
                type="button"
                className={`carousel-action-btn ${isSaved ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleWishlist(activeProduct);
                }}
                title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
                aria-label={isSaved ? 'Remove from Wishlist' : 'Save frame to Wishlist'}
              >
                <Heart size={16} fill={isSaved ? 'var(--color-amber)' : 'none'} />
              </button>

              <button
                type="button"
                className="carousel-action-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openQuickView(activeProduct);
                }}
                title="Quick View Frame Details"
                aria-label="Quick View Frame Specifications"
              >
                <Eye size={16} />
              </button>

              <button
                type="button"
                className={`carousel-action-btn ${cartFeedback ? 'is-confirmed' : ''}`}
                onClick={handleQuickAddToCart}
                title="Add to Atelier Bag"
                aria-label="Add to Atelier Bag"
              >
                {cartFeedback ? <Check size={16} /> : <ShoppingBag size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Frame Architectural Information Card */}
        <div className={`carousel-meta-card ${isTransitioning ? 'is-shifting' : ''}`}>
          <div className="meta-card-top">
            <div className="meta-title-group">
              <span className="meta-shape-category">
                {activeProduct?.category.toUpperCase()} • {activeProduct?.shape.toUpperCase()} SILHOUETTE
              </span>
              <h3 className="meta-frame-title">
                <Link to={`/product/${activeProduct?.slug}`}>{activeProduct?.name}</Link>
              </h3>
            </div>

            <div className="meta-price-block">
              <span className="meta-price-current">{formatINR(activeProduct?.price || 0)}</span>
              {activeProduct?.originalPrice && (
                <span className="meta-price-original">{formatINR(activeProduct.originalPrice)}</span>
              )}
            </div>
          </div>

          <p className="meta-material-desc">{activeProduct?.materialDescription}</p>

          {/* Color Variant Finishes Swatches */}
          {activeProduct?.colors && activeProduct.colors.length > 1 && (
            <div className="meta-swatches-row">
              <span className="swatches-label">FINISH:</span>
              <div className="swatches-group" role="radiogroup" aria-label="Frame color options">
                {activeProduct.colors.map((color) => {
                  const isSelected = selectedColor?.id === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`meta-swatch-item ${isSelected ? 'is-active' : ''}`}
                      onClick={() => setSelectedColorOverride(color)}
                      title={color.name}
                    >
                      <span
                        className="swatch-color-pill"
                        style={{
                          background: color.secondaryHex
                            ? `linear-gradient(135deg, ${color.hex} 50%, ${color.secondaryHex} 50%)`
                            : color.hex,
                        }}
                      />
                    </button>
                  );
                })}
                <span className="swatch-name-display">{selectedColor?.name}</span>
              </div>
            </div>
          )}

          {/* Frame Specifications Strip */}
          <div className="meta-specifications-grid">
            <div className="meta-spec-item">
              <span className="spec-label">CALIBRE</span>
              <span className="spec-value">
                {activeProduct ? formatOpticalSize(activeProduct.dimensions) : '48 □ 21 — 145 mm'}
              </span>
            </div>
            <div className="meta-spec-divider" />
            <div className="meta-spec-item">
              <span className="spec-label">MASS</span>
              <span className="spec-value">{activeProduct?.weight}</span>
            </div>
            <div className="meta-spec-divider" />
            <div className="meta-spec-item">
              <span className="spec-label">FACIAL DRAPE</span>
              <span className="spec-value">{activeProduct?.fit}</span>
            </div>
          </div>

          {/* Bottom Card Actions */}
          <div className="meta-actions-bar">
            <Link to={`/product/${activeProduct?.slug}`} className="meta-explore-btn">
              <span>EXPLORE FRAME ARCHIVE</span>
              <ArrowUpRight size={14} />
            </Link>

            <button
              type="button"
              className="meta-bag-quick-btn"
              onClick={handleQuickAddToCart}
            >
              <ShoppingBag size={14} />
              <span>{cartFeedback ? 'ADDED TO BAG' : 'ACQUIRE FRAME'}</span>
            </button>
          </div>
        </div>

        {/* Framing Corner Ornaments */}
        <div className="stage-corner corner-tl" />
        <div className="stage-corner corner-tr" />
        <div className="stage-corner corner-bl" />
        <div className="stage-corner corner-br" />
      </div>

      {/* Cinematic Horizontal Product Strip & Navigation Track */}
      <div className="carousel-navigation-section">
        {/* Timeline Progress Bar & Playback Controls */}
        <div className="carousel-playback-header">
          <div className="playback-timer-bar">
            <div className="playback-timer-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="playback-controls-cluster">
            <button
              type="button"
              className="playback-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pause Auto-cycle' : 'Resume Auto-cycle'}
              aria-label={isPlaying ? 'Pause campaign rotation' : 'Play campaign rotation'}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            </button>

            <span className="playback-counter">
              <strong className="counter-current">{String(currentIndex + 1).padStart(2, '0')}</strong>
              <span className="counter-divider">/</span>
              <span className="counter-total">{String(products.length).padStart(2, '0')}</span>
            </span>

            <div className="playback-arrows">
              <button
                type="button"
                className="playback-arrow-btn"
                onClick={goToPrev}
                title="Previous Frame"
                aria-label="Previous Frame"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="playback-arrow-btn"
                onClick={goToNext}
                title="Next Frame"
                aria-label="Next Frame"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Seamless Scrolling Product Cards Track */}
        <div
          ref={trackRef}
          className="carousel-track-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          role="region"
          aria-label="Eyewear product strip"
        >
          {products.map((product, idx) => {
            const isActive = idx === currentIndex;
            const thumbImage = product.colors?.[0]?.image || product.defaultImage;

            return (
              <div
                key={product.id}
                className={`carousel-thumb-card ${isActive ? 'is-active' : ''}`}
                onClick={() => goToIndex(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToIndex(idx);
                  }
                }}
                aria-label={`Select ${product.name}`}
              >
                <div className="thumb-image-frame">
                  <img src={thumbImage} alt={product.name} className="thumb-image" loading="lazy" />
                  {isActive && <div className="thumb-active-halo" />}
                </div>

                <div className="thumb-info-stack">
                  <div className="thumb-index-badge">0{idx + 1}</div>
                  <span className="thumb-title">{product.name}</span>
                  <span className="thumb-material">
                    {product.materialType === 'titanium'
                      ? 'Titanium'
                      : product.materialType === 'acetate'
                      ? 'Mazzucchelli Acetate'
                      : 'Atelier Crafted'}
                  </span>
                  <span className="thumb-price">{formatINR(product.price)}</span>
                </div>

                {isActive && <div className="thumb-active-indicator" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
