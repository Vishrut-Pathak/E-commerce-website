import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer_container">
        <div className="footer_column">
          <h3>ONLINE SHOPPING</h3>
          <Link to="/category/men">Men</Link>
          <Link to="/category/women">Women</Link>
          <Link to="/category/kids">Kids</Link>
          <Link to="/category/home-living">Home & Living</Link>
          <Link to="/category/beauty">Beauty</Link>
        </div>

        <div className="footer_column">
          <h3>CUSTOMER POLICIES</h3>
          <a href="#" onClick={(e) => e.preventDefault()}>Contact Us</a>
          <a href="#" onClick={(e) => e.preventDefault()}>FAQ</a>
          <a href="#" onClick={(e) => e.preventDefault()}>T&C</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Track Orders</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Shipping & Returns</a>
        </div>

        <div className="footer_column">
          <h3>100% ORIGINAL GUARANTEE</h3>
          <p className="footer-guarantee-text">
            All products are genuine, sourced directly from brands, and quality checked.
          </p>
          <div className="footer-features">
            <div className="feature-item">
              <strong>Return within 14 days</strong> of receiving your order
            </div>
            <div className="feature-item">
              <strong>Free Delivery</strong> on eligible orders
            </div>
          </div>
        </div>
      </div>
      <hr className="footer-divider" />

      <div className="copyright">
        © 2026 www.myntra.com clone. All rights reserved. Built with React & Redux.
      </div>
    </footer>
  );
};

export default Footer;