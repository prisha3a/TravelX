import React from 'react';

const packageData = [
  {
    id: 1,
    name: 'Weekend Getaway',
    category: 'Budget',
    price: '₹5,999',
    duration: '2 Nights',
    highlights: 'Local Sightseeing, Meals Included, Hotel Stay',
  },
  {
    id: 2,
    name: 'Adventure Trail',
    category: 'Standard',
    price: '₹15,999',
    duration: '5 Nights',
    highlights: 'Trekking, Adventure Sports, Accommodation, Meals',
  },
  {
    id: 3,
    name: 'Luxury Retreat',
    category: 'Premium',
    price: '₹45,999',
    duration: '7 Nights',
    highlights: 'Premium Stays, Guided Tours, Spa, All Meals',
  },
  {
    id: 4,
    name: 'Beach Paradise',
    category: 'Standard',
    price: '₹12,999',
    duration: '3 Nights',
    highlights: 'Beach Resort, Water Sports, Local Cuisine',
  },
  {
    id: 5,
    name: 'Mountain Explorer',
    category: 'Standard',
    price: '₹18,999',
    duration: '4 Nights',
    highlights: 'Mountain Views, Hiking, Bonfire, Adventure',
  },
  {
    id: 6,
    name: 'Royal Heritage Tour',
    category: 'Premium',
    price: '₹32,999',
    duration: '6 Nights',
    highlights: 'Palace Tours, Heritage Sites, Luxury Stays',
  },
];

export default function Packages() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Tour Packages</h1>
          <p className="lead mb-0">Choose the best package for your trip ✅</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cards-grid">
            {packageData.map((pkg) => (
              <div key={pkg.id} className="card">
                <div className="card-body">
                  <span className="badge" style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
                    {pkg.category}
                  </span>
                  <h5 className="card-title">{pkg.name}</h5>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>
                    {pkg.price}
                  </p>
                  <p style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}>
                    <strong>Duration:</strong> {pkg.duration}
                  </p>
                  <p className="card-text">
                    <strong>Includes:</strong> {pkg.highlights}
                  </p>
                  <button className="btn btn-dark" style={{ width: '100%' }}>
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
