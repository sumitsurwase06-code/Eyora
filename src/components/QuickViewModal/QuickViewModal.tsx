import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, ArrowRight, ShieldCheck, Ruler } from 'lucide-react';
import { useQuickView } from '../../context/QuickViewContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { ColorVariant, LensOption } from '../../types';
import { LENS_OPTIONS } from '../../data/products';
import { formatINR, formatOpticalSize } from '../../utils/formatters';
import './QuickViewModal.css';

export const QuickViewModal: React.FC = () => {
  const { activeProduct, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
  const [selectedLens, setSelectedLens] = useState<LensOption>(LENS_OPTIONS[0]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    if (activeProduct) {
      const defaultColor = activeProduct.colors[0];
      setSelectedColor(defaultColor);
      setActiveImage(defaultColor.image || activeProduct.defaultImage);
      setSelectedLens(LENS_OPTIONS[0]);
      setQuantity(1);
      setAddedNotice(false);
    }
  }, [activeProduct]);

  if (!activeProduct || !selectedColor) return null;

  const isSaved = isInWishlist(activeProduct.id);
  const totalUnitPrice = activeProduct.price + selectedLens.additionalPrice;

  const handleAdd = () => {
    addToCart(activeProduct, selectedColor, selectedLens, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      closeQuickView();
    }, 900);
  };

  return (
    <div className="quickview-overlay" onClick={closeQuickView} role="dialog" aria-modal="true">
      <div className="quickview-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="quickview-close-btn"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="quickview-grid">
          {/* Left: Product Gallery */}
          <div className="quickview-gallery-col">
            <div className="quickview-main-image-wrap">
              <img
                src={activeImage}
                alt={activeProduct.name}
                className="quickview-main-img"
              />
              <div className="quickview-badge-wrap">
                {activeProduct.badge && (
                  <span className="luxury-badge">{activeProduct.badge}</span>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="quickview-thumbnails">
              {activeProduct.galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`quickview-thumb-btn ${activeImage === img ? 'active' : ''}`}
                >
                  <img src={img} alt="" className="quickview-thumb-img" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Frame Details & Options */}
          <div className="quickview-details-col">
            <div className="quickview-meta-row">
              <span className="caption-label">
                {activeProduct.category.toUpperCase()} • {activeProduct.materialType.toUpperCase()}
              </span>
              <button
                onClick={() => toggleWishlist(activeProduct)}
                className={`quickview-wishlist-toggle ${isSaved ? 'active' : ''}`}
                title={isSaved ? 'In wishlist' : 'Save to wishlist'}
              >
                <Heart size={16} fill={isSaved ? '#D9914B' : 'transparent'} color={isSaved ? '#D9914B' : '#E9C99A'} />
              </button>
            </div>

            <h2 className="quickview-title">{activeProduct.name}</h2>
            <p className="quickview-subtitle">{activeProduct.subtitle}</p>

            {/* Price Display */}
            <div className="quickview-price-row">
              <span className="quickview-price">{formatINR(totalUnitPrice)}</span>
              {activeProduct.originalPrice && (
                <span className="quickview-orig-price">{formatINR(activeProduct.originalPrice)}</span>
              )}
              <span className="quickview-tax-note">Includes luxury presentation chest & taxes</span>
            </div>

            <p className="quickview-desc">{activeProduct.description}</p>

            {/* Color Swatch Picker */}
            <div className="quickview-option-group">
              <div className="option-label-row">
                <span className="option-label">FRAME FINISH:</span>
                <span className="option-value">{selectedColor.name}</span>
              </div>
              <div className="quickview-swatches">
                {activeProduct.colors.map((c) => {
                  const isCur = selectedColor.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedColor(c);
                        if (c.image) setActiveImage(c.image);
                      }}
                      className={`quickview-swatch ${isCur ? 'active' : ''}`}
                      title={c.name}
                      style={{ backgroundColor: c.hex }}
                    >
                      {c.secondaryHex && (
                        <span
                          className="swatch-split"
                          style={{ backgroundColor: c.secondaryHex }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lens Option Selector */}
            <div className="quickview-option-group">
              <div className="option-label-row">
                <span className="option-label">OPTICAL LENS SPECIFICATION:</span>
              </div>
              <select
                value={selectedLens.id}
                onChange={(e) => {
                  const found = LENS_OPTIONS.find((l) => l.id === e.target.value);
                  if (found) setSelectedLens(found);
                }}
                className="quickview-select"
              >
                {LENS_OPTIONS.map((lens) => (
                  <option key={lens.id} value={lens.id}>
                    {lens.name} {lens.additionalPrice > 0 ? `(+${formatINR(lens.additionalPrice)})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Frame Dimensions & Sizing */}
            <div className="quickview-sizing-box">
              <div className="sizing-box-header">
                <Ruler size={14} className="sizing-icon" />
                <span>FRAME GEOMETRY: {formatOpticalSize(activeProduct.dimensions)}</span>
              </div>
              <div className="sizing-metrics-grid">
                <div className="metric-cell">
                  <span className="metric-val">{activeProduct.dimensions.lensWidth}mm</span>
                  <span className="metric-lbl">Lens Width</span>
                </div>
                <div className="metric-cell">
                  <span className="metric-val">{activeProduct.dimensions.bridgeWidth}mm</span>
                  <span className="metric-lbl">Bridge Gap</span>
                </div>
                <div className="metric-cell">
                  <span className="metric-val">{activeProduct.dimensions.templeLength}mm</span>
                  <span className="metric-lbl">Temple Arm</span>
                </div>
                <div className="metric-cell">
                  <span className="metric-val">{activeProduct.weight}</span>
                  <span className="metric-lbl">Total Weight</span>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Bag */}
            <div className="quickview-action-row">
              <div className="quickview-qty-control">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-number">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="btn-solid-champagne quickview-add-btn"
              >
                <ShoppingBag size={16} />
                <span>{addedNotice ? 'COMMISSION RESERVED!' : `ADD TO BAG • ${formatINR(totalUnitPrice * quantity)}`}</span>
              </button>
            </div>

            {/* Link to Full Page */}
            <div className="quickview-full-link-wrap">
              <Link
                to={`/product/${activeProduct.slug}`}
                onClick={closeQuickView}
                className="link-editorial"
              >
                VIEW COMPLETE SPECIFICATIONS & CRAFTSMANSHIP <ArrowRight size={13} />
              </Link>
            </div>

            {/* Guarantee Note */}
            <div className="quickview-guarantee">
              <ShieldCheck size={14} className="guarantee-icon" />
              <span>Complimentary insured air courier & 30-day atelier exchange policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
