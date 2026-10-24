import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product, ColorVariant } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useQuickView } from '../../context/QuickViewContext';
import { formatINR, formatOpticalSize } from '../../utils/formatters';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  showQuickActions?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showQuickActions = true }) => {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { openQuickView } = useQuickView();

  const isSaved = isInWishlist(product.id);

  // Active preview image based on selected color
  const displayImage = selectedColor.image || product.defaultImage;

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Media Area */}
      <div className="product-media-wrapper">
        <Link to={`/product/${product.slug}`} className="product-image-link" aria-label={`View ${product.name}`}>
          <div className="product-image-container">
            <img
              src={displayImage}
              alt={`${product.name} - ${selectedColor.name}`}
              className="product-main-image"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Top Badges */}
        <div className="product-badge-group">
          {product.badge && <span className="luxury-badge">{product.badge}</span>}
          {product.isSignature && !product.badge && (
            <span className="luxury-badge">SIGNATURE</span>
          )}
        </div>

        {/* Top Right Wishlist Toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`product-wishlist-btn ${isSaved ? 'is-active' : ''}`}
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isSaved ? 'In wishlist' : 'Save to wishlist'}
        >
          <Heart size={16} fill={isSaved ? '#D9914B' : 'transparent'} color={isSaved ? '#D9914B' : '#E9C99A'} />
        </button>

        {/* Hover Action Bar */}
        {showQuickActions && (
          <div className={`product-quick-bar ${isHovered ? 'visible' : ''}`}>
            <button
              onClick={() => openQuickView(product)}
              className="quick-bar-btn"
              title="Quick inspect frame"
            >
              <Eye size={15} />
              <span>QUICK VIEW</span>
            </button>

            <button
              onClick={() => addToCart(product, selectedColor)}
              className="quick-bar-btn quick-bar-btn--primary"
              title="Add frame to shopping bag"
            >
              <ShoppingBag size={15} />
              <span>ADD TO BAG</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Details Area */}
      <div className="product-info-area">
        <div className="product-meta-row">
          <span className="product-category-tag">
            {product.category.toUpperCase()} • {formatOpticalSize(product.dimensions)}
          </span>
          <span className="product-material-pill">{product.materialType}</span>
        </div>

        <h3 className="product-title">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>

        <p className="product-subtitle">{product.subtitle}</p>

        {/* Swatch & Price Row */}
        <div className="product-bottom-row">
          <div className="product-swatches" aria-label="Available frame finishes">
            {product.colors.map((color) => {
              const isSelected = selectedColor.id === color.id;
              return (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`color-swatch-dot ${isSelected ? 'active' : ''}`}
                  title={color.name}
                  aria-label={color.name}
                  style={{
                    backgroundColor: color.hex,
                    border: isSelected ? '2px solid #E9C99A' : '1px solid rgba(233, 201, 154, 0.4)',
                  }}
                >
                  {color.secondaryHex && (
                    <span
                      className="color-swatch-split"
                      style={{ backgroundColor: color.secondaryHex }}
                    />
                  )}
                </button>
              );
            })}
            <span className="color-swatch-name">{selectedColor.name}</span>
          </div>

          <div className="product-pricing">
            {product.originalPrice && (
              <span className="product-original-price">{formatINR(product.originalPrice)}</span>
            )}
            <span className="product-price">{formatINR(product.price)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
