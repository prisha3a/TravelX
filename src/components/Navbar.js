import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-container">
      <div className="navbar-wrapper">
        <Link to="/" className="navbar-brand">
          TravelX
        </Link>

        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li>
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/destinations"
              className={`nav-link ${isActive('/destinations') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Destinations
            </Link>
          </li>
          <li>
            <Link
              to="/packages"
              className={`nav-link ${isActive('/packages') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Packages
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li className="book-now-item">
            <Link to="/contact" className="btn-book" onClick={() => setIsOpen(false)}>
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
