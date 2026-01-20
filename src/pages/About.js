import React from 'react';

export default function About() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>About TravelX</h1>
          <p className="lead mb-0">Your trusted travel companion</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="section-title">Our Story</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
              TravelX was founded with a simple mission: to make travel planning easy, affordable,
              and accessible to everyone. We believe that everyone deserves to explore the world,
              and we're here to help you make that dream a reality.
            </p>

            <h2 className="section-title">Our Mission</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
              We aim to provide the best travel experiences by connecting travelers with verified
              tour operators, offering competitive pricing, and delivering exceptional customer
              service at every step of your journey.
            </p>

            <h2 className="section-title">Why Us?</h2>
            <div className="cards-grid" style={{ marginTop: '2rem' }}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">10+ Years Experience</h5>
                  <p className="card-text">
                    A decade of expertise in the travel industry, serving thousands of happy travelers.
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">50+ Destinations</h5>
                  <p className="card-text">
                    Curated packages to amazing destinations across the globe.
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">100% Verified</h5>
                  <p className="card-text">
                    All partners and operators are verified for authenticity and safety.
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">24/7 Support</h5>
                  <p className="card-text">
                    Round-the-clock customer support to assist you whenever needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <p style={{ textAlign: 'center', fontSize: '1.1rem', marginBottom: '3rem' }}>
            Dedicated professionals passionate about making travel dreams come true
          </p>

          <div className="cards-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div style={{ height: '200px', background: '#e0e0e0', marginBottom: '1rem' }}></div>
                <div className="card-body">
                  <h5 className="card-title">Team Member {i}</h5>
                  <p className="card-text">Travel Expert & Enthusiast</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
