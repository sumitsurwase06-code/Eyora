import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Ruler,
  ChevronDown,
  Sparkles,
  Truck,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { apiService } from '../services/apiService';
import { Product, ColorVariant, LensOption } from '../types';
import { LENS_OPTIONS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR, formatOpticalSize } from '../utils/formatters';
import { ProductCard } from '../components/ProductCard/ProductCard';
import './ProductDetailPage.css';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
  const [selectedLens, setSelectedLens] = useState<LensOption>(LENS_OPTIONS[0]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState<string>('craftsmanship');

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProductData = async () => {
      setIsLoading(true);
      try {
        if (!slug) return;
        const found = await apiService.getProductBySlug(slug);
        if (found) {
          setProduct(found);
          const initialColor = found.colors[0];
          setSelectedColor(initialColor);
          setActiveImage(initialColor.image || found.defaultImage);
          setSelectedLens(LENS_OPTIONS[0]);
          setQuantity(1);

          // Fetch similar products
          const all = await apiService.getProducts();
          setSimilarProducts(all.filter((p) => p.id !== found.id).slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProductData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="pdp-loading">
        <span className="bestsellers-loader" />
        <p>Unlocking atelier vault...</p>
      </div>
    );
  }

  if (!product || !selectedColor) {
    return (
      <div className="pdp-not-found container">
        <h2>Frame Not Found in Archive</h2>
        <p>This creation may have retired to private collections.</p>
        <Link to="/collection" className="btn-primary">
          EXPLORE THE ARCHIVE
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);
  const unitPrice = product.price + selectedLens.additionalPrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedLens, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const toggleAccordionSection = (key: string) => {
    setOpenAccordion(openAccordion === key ? '' : key);
  };

  return (
    <div className="pdp-wrapper">
      {/* Breadcrumbs */}
      <div className="container-wide pdp-breadcrumbs-bar">
        <Link to="/">HOME</Link>
        <span className="crumb-sep">/</span>
        <Link to="/collection">ARCHIVE</Link>
        <span className="crumb-sep">/</span>
        <Link to={`/collection?category=${product.category}`}>
          {product.category.toUpperCase()}
        </Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">{product.name}</span>
      </div>

      <div className="container-wide pdp-main-grid">
        {/* Left Column: High-Res Gallery */}
        <div className="pdp-gallery-col">
          <div className="pdp-main-image-viewport">
            <img
              src={activeImage}
              alt={`${product.name} - ${selectedColor.name}`}
              className="pdp-main-image"
            />
            {product.badge && (
              <span className="luxury-badge pdp-badge">{product.badge}</span>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              className={`pdp-wishlist-toggle ${isSaved ? 'active' : ''}`}
              title={isSaved ? 'In wishlist' : 'Save to wishlist'}
              aria-label="Toggle wishlist"
            >
              <Heart
                size={18}
                fill={isSaved ? '#D9914B' : 'transparent'}
                color={isSaved ? '#D9914B' : '#E9C99A'}
              />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="pdp-thumbnails-strip">
            {product.galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`pdp-thumb-item ${activeImage === img ? 'active' : ''}`}
              >
                <img src={img} alt="" className="pdp-thumb-img" />
              </button>
            ))}
          </div>

          {/* Optical Sizing Diagram Box */}
          <div className="pdp-sizing-card">
            <div className="pdp-sizing-header">
              <Ruler size={16} className="sizing-icon" />
              <span>ATELIER FRAME GEOMETRY</span>
              <span className="pdp-optical-notation">{formatOpticalSize(product.dimensions)}</span>
            </div>

            <div className="pdp-dimensions-matrix">
              <div className="matrix-block">
                <span className="matrix-val">{product.dimensions.lensWidth} mm</span>
                <span className="matrix-lbl">Lens Diameter (A)</span>
              </div>
              <div className="matrix-block">
                <span className="matrix-val">{product.dimensions.bridgeWidth} mm</span>
                <span className="matrix-lbl">Distance Between Lenses (DBL)</span>
              </div>
              <div className="matrix-block">
                <span className="matrix-val">{product.dimensions.templeLength} mm</span>
                <span className="matrix-lbl">Temple Arm Curve Length</span>
              </div>
              <div className="matrix-block">
                <span className="matrix-val">{product.weight}</span>
                <span className="matrix-lbl">Net Frame Mass</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sartorial Configuration */}
        <div className="pdp-info-col">
          <div className="pdp-eyebrow-row">
            <span className="caption-label">
              {product.materialType.toUpperCase()} • {product.shape.toUpperCase()} SILHOUETTE
            </span>
            <span className="pdp-fit-pill">{product.fit}</span>
          </div>

          <h1 className="pdp-title">{product.name}</h1>
          <p className="pdp-subtitle">{product.subtitle}</p>

          {/* Pricing */}
          <div className="pdp-price-row">
            <span className="pdp-price">{formatINR(unitPrice)}</span>
            {product.originalPrice && (
              <span className="pdp-orig-price">{formatINR(product.originalPrice)}</span>
            )}
            <span className="pdp-tax-note">Includes white-glove insured delivery & taxes</span>
          </div>

          <p className="pdp-description">{product.description}</p>

          {/* Color Variants */}
          <div className="pdp-config-section">
            <div className="pdp-config-label-row">
              <span className="config-label">FRAME COLORWAY:</span>
              <span className="config-value">{selectedColor.name}</span>
            </div>
            <div className="pdp-color-swatches">
              {product.colors.map((color) => {
                const isSelected = selectedColor.id === color.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => {
                      setSelectedColor(color);
                      if (color.image) setActiveImage(color.image);
                    }}
                    className={`pdp-swatch-dot ${isSelected ? 'active' : ''}`}
                    title={color.name}
                    style={{ backgroundColor: color.hex }}
                  >
                    {color.secondaryHex && (
                      <span
                        className="swatch-split"
                        style={{ backgroundColor: color.secondaryHex }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optical Lens Customization Selector */}
          <div className="pdp-config-section">
            <div className="pdp-config-label-row">
              <span className="config-label">LENS PRESCRIPTION SPECIFICATION:</span>
            </div>
            <div className="pdp-lens-options-list">
              {LENS_OPTIONS.map((lens) => {
                const isLensActive = selectedLens.id === lens.id;
                return (
                  <label
                    key={lens.id}
                    className={`pdp-lens-card ${isLensActive ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="lensOption"
                      checked={isLensActive}
                      onChange={() => setSelectedLens(lens)}
                    />
                    <div className="lens-card-text">
                      <div className="lens-card-top">
                        <span className="lens-name">{lens.name}</span>
                        <span className="lens-fee">
                          {lens.additionalPrice > 0
                            ? `+${formatINR(lens.additionalPrice)}`
                            : 'INCLUDED'}
                        </span>
                      </div>
                      <p className="lens-desc">{lens.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Actions: Quantity & Add to Bag */}
          <div className="pdp-actions-row">
            <div className="pdp-qty-stepper">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="qty-btn"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="qty-val">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="qty-btn"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-solid-champagne pdp-add-bag-btn"
            >
              <ShoppingBag size={18} />
              <span>
                {addedNotice
                  ? 'COMMISSION RESERVED IN BAG!'
                  : `ACQUIRE FRAME • ${formatINR(totalPrice)}`}
              </span>
            </button>
          </div>

          {/* Delivery & Assurance Pills */}
          <div className="pdp-perks-strip">
            <div className="perk-cell">
              <Truck size={15} className="perk-icon" />
              <span>Insured global white-glove courier</span>
            </div>
            <div className="perk-cell">
              <RotateCcw size={15} className="perk-icon" />
              <span>30-Day complimentary atelier exchange</span>
            </div>
            <div className="perk-cell">
              <ShieldCheck size={15} className="perk-icon" />
              <span>Lifetime frame structural guarantee</span>
            </div>
          </div>

          {/* Expandable Accordions */}
          <div className="pdp-accordions-group">
            {/* Accordion 1: Craftsmanship */}
            <div className="pdp-accordion-item">
              <button
                onClick={() => toggleAccordionSection('craftsmanship')}
                className="pdp-accordion-trigger"
              >
                <span>ATELIER CRAFTSMANSHIP & HERITAGE</span>
                <ChevronDown
                  size={16}
                  className={`accordion-chevron ${
                    openAccordion === 'craftsmanship' ? 'open' : ''
                  }`}
                />
              </button>
              {openAccordion === 'craftsmanship' && (
                <div className="pdp-accordion-content">
                  <p>{product.story}</p>
                  <ul className="craft-bullets-list">
                    {product.craftsmanshipHighlights.map((hl, i) => (
                      <li key={i}>
                        <Sparkles size={12} className="bullet-sparkle" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Accordion 2: Materials & Specs */}
            <div className="pdp-accordion-item">
              <button
                onClick={() => toggleAccordionSection('specs')}
                className="pdp-accordion-trigger"
              >
                <span>MATERIAL COMPOSITION & ENGINEERING</span>
                <ChevronDown
                  size={16}
                  className={`accordion-chevron ${
                    openAccordion === 'specs' ? 'open' : ''
                  }`}
                />
              </button>
              {openAccordion === 'specs' && (
                <div className="pdp-accordion-content">
                  <div className="specs-table">
                    <div className="spec-row">
                      <span className="spec-label">Primary Metallurgy / Face:</span>
                      <span className="spec-value">{product.materialDescription}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Hinge Mechanism:</span>
                      <span className="spec-value">Friction-lock multi-barrel custom French hinges</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Nose Pad Architecture:</span>
                      <span className="spec-value">Cold-stamped medical titanium with micro knurling</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Optics Compatibility:</span>
                      <span className="spec-value">Single Vision, Bifocal, High-Index Progressive HD</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: Presentation & Packaging */}
            <div className="pdp-accordion-item">
              <button
                onClick={() => toggleAccordionSection('packaging')}
                className="pdp-accordion-trigger"
              >
                <span>BESPOKE PRESENTATION & CARE SUITE</span>
                <ChevronDown
                  size={16}
                  className={`accordion-chevron ${
                    openAccordion === 'packaging' ? 'open' : ''
                  }`}
                />
              </button>
              {openAccordion === 'packaging' && (
                <div className="pdp-accordion-content">
                  <p>
                    Every Eyora commission arrives within an individually numbered solid espresso walnut casket with magnetic closure, accompanied by a vegetable-tanned Italian calfskin traveling case, micro-fiber optical polishing cloth, and a certificate of Sabae provenance.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Pairing Archetypes */}
      {similarProducts.length > 0 && (
        <section className="pdp-pairing-section">
          <div className="container-wide">
            <div className="pairing-header">
              <span className="eyebrow">COMPLEMENTARY PIECES</span>
              <h2 className="pairing-title">
                CURATE YOUR <span className="font-editorial-italic">ARCHIVE</span>
              </h2>
            </div>
            <div className="pairing-grid">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
