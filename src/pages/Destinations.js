import React from 'react';

const destinationData = [
  {
    id: 1,
    name: 'Delhi',
    image: '3125423.jpg',
    description: 'Explore the capital city with its rich heritage.',
    highlights: 'Red Fort, India Gate, Jama Masjid, Street Food',
  },
  {
    id: 2,
    name: 'Goa',
    image: 'goa-beach-pictures-q3vmgtel313923el.jpg',
    description: 'Golden beaches and vibrant nightlife await.',
    highlights: 'Baga Beach, Anjuna, Water Sports, Portuguese Architecture',
  },
  {
    id: 3,
    name: 'Manali',
    image: 'manali.jpg',
    description: 'Adventure and nature in the Himalayas.',
    highlights: 'Paragliding, Trekking, Rohtang Pass, Snow',
  },
  {
    id: 4,
    name: 'Kerala',
    image: 'kerala.jpg',
    description: 'Serene backwaters and tropical paradise.',
    highlights: 'Backwaters, Houseboats, Tea Gardens, Beaches',
  },
  {
    id: 5,
    name: 'Jaipur',
    image: 'jaipur.jpg',
    description: 'The Pink City of India with royal heritage.',
    highlights: 'City Palace, Hawa Mahal, Bazaars',
  },
  {
    id: 6,
    name: 'Mumbai',
    image: 'mumbai.jpg',
    description: 'The city of dreams with Bollywood glamour.',
    highlights: 'Gateway of India, Marine Drive, Temples',
  },
];

export default function Destinations() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Top Destinations</h1>
          <p className="lead mb-0">Pick your next place to explore ✈️</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cards-grid">
            {destinationData.map((destination) => (
              <div key={destination.id} className="card">
                <img src={destination.image} alt={destination.name} />
                <div className="card-body">
                  <h5 className="card-title">{destination.name}</h5>
                  <p className="card-text">{destination.description}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1rem' }}>
                    <strong>Highlights:</strong> {destination.highlights}
                  </p>
                  <button className="btn btn-primary" style={{ width: '100%' }}>
                    Learn More
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
