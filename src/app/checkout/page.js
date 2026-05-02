'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar/Navbar';
import '../CheckoutPage.css';

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerState, setCustomerState] = useState('');
  const [customerPostcode, setCustomerPostcode] = useState('');

  const deliveryLabels = {
    lalamove: 'Lalamove (Express Delivery)',
    delivery: 'Standard Delivery (2-4 hari)',
    pickup: 'Self Pickup'
  };

  const handleWhatsAppCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!customerName || !customerPhone) {
      alert('Sila isi nama dan nombor telefon');
      return;
    }

    if (deliveryMethod !== 'pickup' && (!customerAddress || !customerCity || !customerState || !customerPostcode)) {
      alert('Sila isi semua maklumat alamat untuk penghantaran');
      return;
    }

    const orderItems = cart.map(item =>
      `• ${item.name} (${item.nameChinese}) x${item.quantity} @ RM${item.price}/${item.unit}`
    ).join('\n');

    const total = getCartTotal();

    let customerInfo = `*Nama:* ${customerName}
*No. Telefon:* ${customerPhone}`;

    if (deliveryMethod !== 'pickup') {
      customerInfo += `
*Alamat:* ${customerAddress}
*Bandar:* ${customerCity}
*Negeri:* ${customerState}
*Poskod:* ${customerPostcode}`;
    }

    // Send data to webhook
    try {
      const webhookData = {
        timestamp: new Date().toISOString(),
        orderItems: cart.map(item => ({
          id: item.id,
          name: item.name,
          nameChinese: item.nameChinese,
          quantity: item.quantity,
          price: item.price,
          unit: item.unit,
          subtotal: item.price * item.quantity
        })),
        total: total.toFixed(2),
        deliveryMethod: deliveryLabels[deliveryMethod],
        customer: {
          name: customerName,
          phone: customerPhone,
          address: deliveryMethod !== 'pickup' ? customerAddress : '',
          city: deliveryMethod !== 'pickup' ? customerCity : '',
          state: deliveryMethod !== 'pickup' ? customerState : '',
          postcode: deliveryMethod !== 'pickup' ? customerPostcode : ''
        }
      };

      fetch('https://hook.integrator.boost.space/erh2kph177fa7x8oivswgjbtr52zk1sc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });
    } catch (error) {
      console.error('Webhook error:', error);
    }

    const message = `Hi BMFireworks! 🎆

I would like to order:
${orderItems}

*Total: RM${total.toFixed(2)}*

*Delivery Method: ${deliveryLabels[deliveryMethod]}*

${customerInfo}

Please confirm availability and delivery details. Thank you!`;

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '60111246041';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="checkout-page">
      <Navbar />

      <div className="checkout-header">
        <h1>Shopping Cart</h1>
        <p>Review your items before checkout</p>
      </div>

      <div className="checkout-container">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <a href="/products" className="continue-shopping">Continue Shopping</a>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="price">RM{item.price} / {item.unit}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="cart-item-total">
                    RM{(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Customer Info</h3>
              <div className="form-group">
                <label>Nama *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nama penuh"
                  required
                />
              </div>
              <div className="form-group">
                <label>No. Telefon *</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="01X-XXXXXXX"
                  required
                />
              </div>

              <h3>Delivery Method</h3>
              <div className="delivery-options">
                <label className="delivery-option">
                  <input
                    type="radio"
                    name="delivery"
                    value="lalamove"
                    checked={deliveryMethod === 'lalamove'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  />
                  <span>Lalamove (JB & Ipoh sahaja)</span>
                </label>
                <label className="delivery-option">
                  <input
                    type="radio"
                    name="delivery"
                    value="delivery"
                    checked={deliveryMethod === 'delivery'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  />
                  <span>Standard Delivery (2-4 hari)</span>
                </label>
                <label className="delivery-option">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryMethod === 'pickup'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  />
                  <span>Self Pickup (Kilang Ipoh / Seelong JB)</span>
                </label>
              </div>

              {deliveryMethod === 'pickup' && (
                <div style={{
                  background: 'rgba(0, 206, 209, 0.1)',
                  padding: '12px',
                  borderRadius: '8px',
                  marginTop: '10px',
                  fontSize: '0.9rem',
                  color: '#333'
                }}>
                  <strong>Lokasi Self Pickup:</strong>
                  <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
                    <li>Kilang Ipoh, Perak</li>
                    <li>Seelong, Johor Bahru</li>
                  </ul>
                </div>
              )}

              {deliveryMethod !== 'pickup' && (
                <>
                  <h3 style={{ marginTop: '20px' }}>Alamat Penghantaran</h3>
                  <div className="form-group">
                    <label>Alamat (No. Unit, Jalan, Taman) *</label>
                    <textarea
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Cth: No. 123, Jalan ABC, Taman XYZ"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Bandar/Kawasan *</label>
                    <input
                      type="text"
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      placeholder="Cth: Senai, Johor Bahru"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Negeri *</label>
                    <select
                      value={customerState}
                      onChange={(e) => setCustomerState(e.target.value)}
                      required
                      style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem' }}
                    >
                      <option value="">Pilih Negeri</option>
                      <option value="Johor">Johor</option>
                      <option value="Kedah">Kedah</option>
                      <option value="Kelantan">Kelantan</option>
                      <option value="Kuala Lumpur">Kuala Lumpur</option>
                      <option value="Melaka">Melaka</option>
                      <option value="Negeri Sembilan">Negeri Sembilan</option>
                      <option value="Pahang">Pahang</option>
                      <option value="Perak">Perak</option>
                      <option value="Perlis">Perlis</option>
                      <option value="Pulau Pinang">Pulau Pinang</option>
                      <option value="Putrajaya">Putrajaya</option>
                      <option value="Selangor">Selangor</option>
                      <option value="Terengganu">Terengganu</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Poskod *</label>
                    <input
                      type="text"
                      value={customerPostcode}
                      onChange={(e) => setCustomerPostcode(e.target.value)}
                      placeholder="Cth: 81400"
                      maxLength="5"
                      required
                    />
                  </div>
                </>
              )}

              <div className="summary-row" style={{ marginTop: '20px' }}>
                <span>Total:</span>
                <span className="total-amount">RM{getCartTotal().toFixed(2)}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={handleWhatsAppCheckout}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order via WhatsApp
              </button>
              <button
                className="clear-cart-btn"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
