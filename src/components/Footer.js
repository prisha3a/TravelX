import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h5>About TravelX</h5>
            <p>
              Your trusted travel companion for discovering destinations and booking amazing
              travel experiences worldwide.
            </p>
          </div>

          <div className="footer-section">
            <h5>Quick Links</h5>
            <Link to="/">Home</Link>
            <Link to="/destinations">Destinations</Link>
            <Link to="/packages">Packages</Link>
            <Link to="/about">About Us</Link>
          </div>

          <div className="footer-section">
            <h5>Support</h5>
            <Link to="/contact">Contact Us</Link>
            <a href="mailto:support@travelx.com">Email Support</a>
            <a href="tel:+1234567890">Call Us: +1-800-TRAVEL</a>
          </div>

          <div className="footer-section">
            <h5>Follow Us</h5>
            <a href="#facebook">Facebook</a>
            <a href="#twitter">Twitter</a>
            <a href="#instagram">Instagram</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 TravelX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
