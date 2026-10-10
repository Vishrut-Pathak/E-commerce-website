import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import { bagActions } from '../store/bagSlice';
import { FiCheckCircle, FiShield, FiTruck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const BagSummury = () => {
  const dispatch = useDispatch();
  const bagItems = useSelector((state) => state.bag);
  const items = useSelector((state) => state.items);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const finalitems = items.filter((item) => {
    return bagItems.indexOf(item.id) >= 0;
  });

  const CONVENIENCE_FEES = 99;
  const totalItem = bagItems.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  finalitems.forEach((bagItem) => {
    const orig = bagItem.original_price || bagItem.current_price;
    totalMRP += orig;
    totalDiscount += orig - bagItem.current_price;
  });

  const finalPayment = totalItem > 0 ? totalMRP - totalDiscount + CONVENIENCE_FEES : 0;

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      dispatch(authActions.openAuthModal("login"));
      return;
    }

    const randomOrderId = "OD" + Math.floor(10000000 + Math.random() * 90000000);
    setOrderId(randomOrderId);
    setOrderSuccess(true);
    dispatch(bagActions.clearBag());
  };

  if (orderSuccess) {
    return (
      <div className="order-success-modal-wrapper">
        <div className="order-success-card">
          <div className="order-success-icon">
            <FiCheckCircle size={56} color="#03a685" />
          </div>
          <h3>Order Placed Successfully!</h3>
          <p className="order-id-text">Order ID: <strong>{orderId}</strong></p>
          <p className="order-greeting">
            Thank you for shopping with us, <strong>{user?.name || user?.username}</strong>!
          </p>
          <div className="order-perks">
            <div><FiTruck /> Free tracking notification sent to your account</div>
            <div><FiShield /> 100% Genuine products with hassle-free returns</div>
          </div>
          <Link
            to="/"
            className="btn-continue-shopping"
            onClick={() => setOrderSuccess(false)}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bag-summary">
      <div className="bag-details-container">
        <div className="price-header">PRICE DETAILS ({totalItem} {totalItem === 1 ? "Item" : "Items"})</div>

        <div className="price-item">
          <span className="price-item-tag">Total MRP</span>
          <span className="price-item-value">₹{totalMRP}</span>
        </div>

        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">-₹{totalDiscount}</span>
        </div>

        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">
            {totalItem > 0 ? `₹${CONVENIENCE_FEES}` : "₹0"}
          </span>
        </div>

        <hr />

        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">₹{finalPayment}</span>
        </div>
      </div>

      <button
        type="button"
        className="btn-place-order"
        onClick={handlePlaceOrder}
        disabled={totalItem === 0}
      >
        <div className="css-xjhrni">
          {isAuthenticated ? "PLACE ORDER" : "LOGIN TO PLACE ORDER"}
        </div>
      </button>

      <div className="secure-badge">
        <FiShield style={{ marginRight: 6, color: "#03a685" }} />
        <span>100% Secure Payments & Hassle-free Returns</span>
      </div>
    </div>
  );
};

export default BagSummury;