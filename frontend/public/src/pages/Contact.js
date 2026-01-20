import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    destination: '',
    travelDate: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, destination, travelDate } = formData;

    if (!fullName || !email || !destination || !travelDate) {
      alert('⚠️ Please fill all required fields!');
      return;
    }

    alert(`✅ Booking Request Submitted!
Name: ${fullName}
Email: ${email}
Destination: ${destination}
Date: ${travelDate}

(Backend not connected yet)`);

    setFormData({
      fullName: '',
      email: '',
      destination: '',
      travelDate: '',
      message: '',
    });
  };

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p className="lead mb-0">We'd love to hear from you! 📞</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="section-title">Book Your Adventure</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="destination">Destination *</label>
                <select
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select a destination --</option>
                  <option value="delhi">Delhi</option>
                  <option value="goa">Goa</option>
                  <option value="manali">Manali</option>
                  <option value="kerala">Kerala</option>
                  <option value="jaipur">Jaipur</option>
                  <option value="mumbai">Mumbai</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="travelDate">Preferred Travel Date *</label>
                <input
                  type="date"
                  id="travelDate"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Additional Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your travel preferences, budget, or any special requests..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Submit Booking Request
              </button>
            </form>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <h2 className="section-title">Get in Touch</h2>

          <div className="cards-grid">
            <div className="card">
              <div className="card-body" style={{ textAlign: 'center' }}>
                <h5 className="card-title">📞 Call Us</h5>
                <p className="card-text">
                  <a href="tel:+1234567890" style={{ color: '#007bff' }}>
                    +1-800-TRAVEL-1
                  </a>
                </p>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  Available 24/7
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body" style={{ textAlign: 'center' }}>
                <h5 className="card-title">📧 Email</h5>
                <p className="card-text">
                  <a href="mailto:support@travelx.com" style={{ color: '#007bff' }}>
                    support@travelx.com
                  </a>
                </p>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  We'll respond within 24 hours
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body" style={{ textAlign: 'center' }}>
                <h5 className="card-title">📍 Address</h5>
                <p className="card-text">
                  123 Travel Street
                  <br />
                  Travel City, TC 12345
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
