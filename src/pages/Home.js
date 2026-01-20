import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const destinationCards = [
  {
    id: 1,
    name: 'Delhi',
    description: 'Heritage + Street Food + Culture',
    image: '3125423.jpg',
  },
  {
    id: 2,
    name: 'Goa',
    description: 'Beaches + Nightlife + Water Sports',
    image: 'goa-beach-pictures-q3vmgtel313923el.jpg',
  },
  {
    id: 3,
    name: 'Manali',
    description: 'Mountains + Adventure + Nature',
    image: 'manali.jpg',
  },
  {
    id: 4,
    name: 'Kerala',
    description: 'Backwaters + Beaches + Serenity',
    image: 'kerala.jpg',
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <>
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <span className="badge">Best Travel Deals 2026</span>
            <h1>Explore the World with TravelX</h1>
            <p>Discover destinations, compare packages, and book your next adventure easily.</p>

            <form className="search-box" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search (Goa, Manali, Delhi, Paris)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>

          <div className="highlights">
            <h4>Quick Highlights</h4>
            <ul>
              <li>✅ Verified Tour Packages</li>
              <li>✅ Affordable Prices</li>
              <li>✅ Trusted Travel Partners</li>
              <li>✅ 24/7 Customer Support</li>
            </ul>
          </div>
        </div>
      </header>

      {/* Popular Destinations */}
      <section>
        <div className="container">
          <h2 className="section-title">Popular Destinations</h2>

          <div className="cards-grid">
            {destinationCards.map((dest) => (
              <div key={dest.id} className="card">
                <img src={dest.image} alt={dest.name} />
                <div className="card-body">
                  <h5 className="card-title">{dest.name}</h5>
                  <p className="card-text">{dest.description}</p>
                  <Link to="/destinations" className="btn btn-dark">
                    Explore
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <h2 className="section-title">Why Choose TravelX?</h2>

          <div className="cards-grid">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">🌍 Wide Selection</h5>
                <p className="card-text">
                  Access to thousands of destinations worldwide with detailed guides and reviews.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">💰 Best Prices</h5>
                <p className="card-text">
                  Guaranteed competitive pricing with exclusive discounts and deals.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">🛡️ Safe & Secure</h5>
                <p className="card-text">
                  Verified tour operators and secure payment gateway for peace of mind.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">🎯 Expert Support</h5>
                <p className="card-text">
                  24/7 customer support to help with bookings, changes, and emergencies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ backgroundColor: '#111', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: 'white' }}>
            Ready to Travel?
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
            Browse our exclusive packages and book your dream vacation today!
          </p>
          <Link to="/packages" className="btn btn-book">
            View All Packages →
          </Link>
        </div>
      </section>
    </>
  );
}
