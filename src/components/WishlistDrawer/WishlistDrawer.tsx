import React from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/formatters';
import './WishlistDrawer.css';

export const WishlistDrawer: React.FC = () => {
  const { isWishlistOpen, closeWishlist, wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="wishlist-overlay" onClick={closeWishlist} role="dialog" aria-modal="true">
      <div className="wishlist-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="wishlist-header">
          <div className="wishlist-title-wrap">
            <Heart size={20} className="wishlist-header-icon" />
            <span className="wishlist-title">SAVED ATELIER CREATIONS</span>
            <span className="wishlist-count-pill">{wishlistItems.length}</span>
          </div>

          <button onClick={closeWishlist} className="wishlist-close-btn" aria-label="Close wishlist">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="wishlist-content">
          {wishlistItems.length === 0 ? (
            <div className="wishlist-empty">
              <span className="empty-title">NO SAVED PIECES YET</span>
              <p className="empty-desc">
                Curate your personal collection of handcrafted eyewear by selecting the heart icon on any frame.
              </p>
              <button onClick={closeWishlist} className="btn-primary">
                <span>EXPLORE ARCHIVE</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="wishlist-list">
              {wishlistItems.map(({ product }) => (
                <div key={product.id} className="wishlist-item-card">
                  <div className="wishlist-thumb-wrap">
                    <img
                      src={product.defaultImage}
                      alt={product.name}
                      className="wishlist-thumb-img"
                    />
                  </div>

                  <div className="wishlist-item-details">
                    <div className="wishlist-item-top">
                      <h4 className="wishlist-item-name">
                        <Link to={`/product/${product.slug}`} onClick={closeWishlist}>
                          {product.name}
                        </Link>
                      </h4>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="wishlist-remove-btn"
                        title="Remove from saved"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="wishlist-item-sub">{product.subtitle}</p>
                    <span className="wishlist-item-price">{formatINR(product.price)}</span>

                    <div className="wishlist-item-actions">
                      <button
                        onClick={() => {
                          addToCart(product, product.colors[0]);
                          removeFromWishlist(product.id);
                        }}
                        className="btn-solid-champagne wishlist-move-btn"
                      >
                        <ShoppingBag size={14} />
                        <span>MOVE TO BAG</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
