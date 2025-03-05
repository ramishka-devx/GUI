import React from "react";
import "./Footer.css"; // Import the CSS file
import Logo from "../logo/Logo";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and About Section */}
        <div className="footer-section logo-section">
          <Logo fontSize="8" />
          <p className="footer-description">
            Fuel your day with delicious and affordable meals crafted for
            students.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/order">Order</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact-section">
          <div className="footer-right-wrapper">
            <h3 className="footer-heading">Contact</h3>
            <p>
              Email:{" "}
              <a href="mailto:info@cafeteria.com" className="footer-link">
                info@cafeteria.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+123456789" className="footer-link">
                +1 234 567 89
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; 2025 Cafeteria Management System | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
