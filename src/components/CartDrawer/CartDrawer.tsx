import React from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/formatters';
import './CartDrawer.css';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    openCheckout,
    cartItems,
    removeFromCart,
    updateQuantity,
    totalItemsCount,
    subtotalAmount,
    totalAmount,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={closeCart} role="dialog" aria-modal="true">
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title-wrap">
            <ShoppingBag size={20} className="cart-header-icon" />
            <span className="cart-header-title">YOUR SHOPPING BAG</span>
            <span className="cart-count-pill">{totalItemsCount}</span>
          </div>

          <button onClick={closeCart} className="cart-close-btn" aria-label="Close cart drawer">
            <X size={20} />
          </button>
        </div>

        {/* Free White-Glove Shipping Progress */}
        <div className="cart-shipping-notice">
          <div className="shipping-notice-text">
            <Sparkles size={14} className="sparkle-icon" />
            <span>COMPLIMENTARY INSURED WHITE-GLOVE COURIER APPLIED</span>
          </div>
          <div className="shipping-progress-track">
            <div className="shipping-progress-fill" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Items List */}
        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <span className="empty-cart-eyebrow">THE ARCHIVE IS EMPTY</span>
              <p className="empty-cart-desc">
                Your shopping bag awaits your discerning selection of handcrafted spectacles and sunglasses.
              </p>
              <button
                onClick={closeCart}
                className="btn-primary empty-cart-btn"
              >
                <span>EXPLORE THE COLLECTION</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => {
                const itemUnitPrice = item.product.price + (item.selectedLens?.additionalPrice || 0);
                const itemTotalPrice = itemUnitPrice * item.quantity;
                const thumbImage = item.selectedColor.image || item.product.defaultImage;

                return (
                  <div key={item.id} className="cart-item-card">
                    {/* Item Thumbnail */}
                    <div className="cart-item-thumb-wrap">
                      <img
                        src={thumbImage}
                        alt={item.product.name}
                        className="cart-item-img"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="cart-item-details">
                      <div className="cart-item-top-row">
                        <h4 className="cart-item-name">
                          <Link to={`/product/${item.product.slug}`} onClick={closeCart}>
                            {item.product.name}
                          </Link>
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="cart-item-remove-btn"
                          aria-label={`Remove ${item.product.name}`}
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="cart-item-options">
                        <span className="cart-option-color">
                          <span
                            className="cart-swatch-tiny"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                        {item.selectedLens && (
                          <span className="cart-option-lens">
                            Lens: {item.selectedLens.name}
                          </span>
                        )}
                      </div>

                      {/* Qty & Price Row */}
                      <div className="cart-item-bottom-row">
                        <div className="cart-item-qty">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="qty-small-btn"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="qty-small-val">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="qty-small-btn"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <span className="cart-item-price">{formatINR(itemTotalPrice)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer / Subtotal & Checkout Action */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-breakdown">
              <div className="summary-row">
                <span className="summary-lbl">Subtotal</span>
                <span className="summary-val">{formatINR(subtotalAmount)}</span>
              </div>
              <div className="summary-row">
                <span className="summary-lbl">White-Glove Insured Delivery</span>
                <span className="summary-val text-amber">COMPLIMENTARY</span>
              </div>
              <div className="summary-row summary-total-row">
                <span className="summary-total-lbl">Estimated Total</span>
                <span className="summary-total-val">{formatINR(totalAmount)}</span>
              </div>
            </div>

            <button
              onClick={openCheckout}
              className="btn-solid-champagne cart-checkout-btn"
            >
              <span>PROCEED TO BESPOKE CHECKOUT</span>
              <ArrowRight size={16} />
            </button>

            <div className="cart-footer-notes">
              <ShieldCheck size={14} className="note-icon" />
              <span>Includes bespoke walnut chest, leather pouch, and certificate</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
