import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Sparkles, Truck, Lock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { apiService, CheckoutPayload } from '../../services/apiService';
import { formatINR } from '../../utils/formatters';
import './CheckoutModal.css';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, closeCheckout, cartItems, subtotalAmount, totalAmount, clearCart } = useCart();

  const [customer, setCustomer] = useState({
    fullName: 'Lady Evelyn Harrington',
    email: 'evelyn.harrington@private-client.com',
    phone: '+91 98200 48291',
    address: 'Apartment 14B, Malabar Hill Crest, B.G. Kher Marg',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400006',
    country: 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'concierge-transfer'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{ orderId: string; status: string } | null>(null);

  if (!isCheckoutOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: CheckoutPayload = {
      items: cartItems.map((i) => ({
        productId: i.product.id,
        colorId: i.selectedColor.id,
        lensOptionId: i.selectedLens?.id,
        quantity: i.quantity,
        price: i.product.price + (i.selectedLens?.additionalPrice || 0),
      })),
      customer,
      totalAmount,
      paymentMethod,
    };

    try {
      const res = await apiService.submitOrder(payload);
      if (res.success) {
        setConfirmedOrder(res.data);
        clearCart();
      }
    } catch (err) {
      console.error('Order error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-overlay" onClick={closeCheckout} role="dialog" aria-modal="true">
      <div className="checkout-dialog" onClick={(e) => e.stopPropagation()}>
        <button onClick={closeCheckout} className="checkout-close-btn" aria-label="Close checkout">
          <X size={20} />
        </button>

        {confirmedOrder ? (
          /* Confirmation Screen */
          <div className="checkout-success-screen">
            <div className="success-icon-wrap">
              <CheckCircle size={44} className="success-check-icon" />
            </div>

            <span className="caption-label">BESPOKE ALLOCATION RESERVED</span>
            <h2 className="success-title">Your Commission Has Been Registered</h2>

            <div className="success-order-box">
              <span className="order-id-label">OFFICIAL ATELIER ORDER NUMBER</span>
              <span className="order-id-val">{confirmedOrder.orderId}</span>
              <p className="order-status-text">{confirmedOrder.status}</p>
            </div>

            <p className="success-desc">
              A private confirmation dossier and tracking coordinates have been dispatched to <strong>{customer.email}</strong>. Our senior lunetier will inspect each hinge and hand-polish your frames prior to white-glove dispatch.
            </p>

            <button onClick={closeCheckout} className="btn-solid-champagne success-btn">
              RETURN TO ATELIER LOOKBOOK
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div className="checkout-content-grid">
            {/* Left Form: Client Info & Address */}
            <form onSubmit={handleSubmit} className="checkout-form-col">
              <div className="checkout-form-header">
                <span className="eyebrow">COMMISSION CHECKOUT</span>
                <h2 className="checkout-heading">Private Client Details</h2>
              </div>

              <div className="form-section-title">
                <Lock size={14} className="lock-icon" />
                <span>CONFIDENTIAL CLIENT INFORMATION</span>
              </div>

              <div className="form-group-grid">
                <div className="form-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label>Telephone</label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label>Postal Code / PIN</label>
                  <input
                    type="text"
                    required
                    value={customer.postalCode}
                    onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-field full-width">
                <label>Boutique Residence Delivery Address</label>
                <input
                  type="text"
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                />
              </div>

              <div className="form-group-grid">
                <div className="form-field">
                  <label>City</label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label>State / Region</label>
                  <input
                    type="text"
                    required
                    value={customer.state}
                    onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="form-section-title payment-section-title">
                <CreditCard size={14} className="lock-icon" />
                <span>CONFIDENTIAL PAYMENT METHOD</span>
              </div>

              <div className="payment-options-grid">
                <label className={`payment-pill ${paymentMethod === 'card' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <span>Luxury Card (Amex / Visa / MC)</span>
                </label>

                <label className={`payment-pill ${paymentMethod === 'upi' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                  />
                  <span>Instant High-Value UPI</span>
                </label>

                <label className={`payment-pill ${paymentMethod === 'concierge-transfer' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'concierge-transfer'}
                    onChange={() => setPaymentMethod('concierge-transfer')}
                  />
                  <span>Atelier Private Concierge Wire</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || cartItems.length === 0}
                className="btn-solid-champagne checkout-submit-btn"
              >
                <ShieldCheck size={16} />
                <span>
                  {isSubmitting
                    ? 'SECURING ATELIER ALLOCATION...'
                    : `CONFIRM COMMISSION • ${formatINR(totalAmount)}`}
                </span>
              </button>
            </form>

            {/* Right Summary: Selected Items */}
            <div className="checkout-summary-col">
              <h3 className="summary-col-title">COMMISSION SUMMARY</h3>

              <div className="checkout-items-scroll">
                {cartItems.map((item) => {
                  const itemUnitPrice = item.product.price + (item.selectedLens?.additionalPrice || 0);
                  const thumb = item.selectedColor.image || item.product.defaultImage;
                  return (
                    <div key={item.id} className="checkout-item-row">
                      <div className="checkout-item-thumb">
                        <img src={thumb} alt={item.product.name} />
                      </div>
                      <div className="checkout-item-meta">
                        <span className="checkout-name">{item.product.name}</span>
                        <span className="checkout-variant">
                          Finish: {item.selectedColor.name} • Qty: {item.quantity}
                        </span>
                        {item.selectedLens && (
                          <span className="checkout-lens">{item.selectedLens.name}</span>
                        )}
                        <span className="checkout-price">{formatINR(itemUnitPrice * item.quantity)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="checkout-totals-box">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>{formatINR(subtotalAmount)}</span>
                </div>
                <div className="total-row">
                  <span>White-Glove Insured Air Delivery</span>
                  <span className="text-amber">COMPLIMENTARY</span>
                </div>
                <div className="total-row final-total-row">
                  <span className="final-label">Total Commission</span>
                  <span className="final-value">{formatINR(totalAmount)}</span>
                </div>
              </div>

              <div className="checkout-perks">
                <div className="perk-item">
                  <Truck size={14} className="perk-icon" />
                  <span>Dispatched via armored, temperature-controlled transit</span>
                </div>
                <div className="perk-item">
                  <Sparkles size={14} className="perk-icon" />
                  <span>Presented in solid walnut case with serialized certificate</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
