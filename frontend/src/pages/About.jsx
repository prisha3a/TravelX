import { Link } from 'react-router-dom'
import { Globe, Users, Award } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container-custom">
          <h1 className="heading-lg text-white mb-4">About TravelX</h1>
          <p className="text-xl text-blue-100">
            Discover the world's most beautiful destinations
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom section-padding">
        <div className="max-w-3xl mx-auto">
          {/* Story */}
          <div className="mb-12">
            <h2 className="heading-md mb-6">Our Story</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              TravelX was founded in 2024 with a simple mission: to make travel accessible and enjoyable for everyone. We believe that travel is one of the most enriching experiences a person can have, and we're passionate about helping you explore the world.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our platform brings together the best destinations, experiences, and travel tips from around the globe, curated by travel enthusiasts who know what makes a great trip.
            </p>
          </div>

          {/* Values */}
          <div className="mb-12">
            <h2 className="heading-md mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Globe size={48} className="mx-auto text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Global Reach</h3>
                <p className="text-gray-600">
                  Connecting travelers with destinations in over 100 countries worldwide
                </p>
              </div>

              <div className="text-center">
                <Users size={48} className="mx-auto text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
                <p className="text-gray-600">
                  Building a vibrant community of travelers sharing experiences and tips
                </p>
              </div>

              <div className="text-center">
                <Award size={48} className="mx-auto text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quality</h3>
                <p className="text-gray-600">
                  Ensuring the highest standards in every destination we feature
                </p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="mb-12">
            <h2 className="heading-md mb-6">Our Team</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              TravelX is powered by a diverse team of travel enthusiasts, developers, and designers who share a passion for exploring the world and connecting people to amazing destinations.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center py-12 bg-blue-50 rounded-lg">
            <h2 className="heading-md text-gray-900 mb-4">Start Your Journey</h2>
            <p className="text-gray-600 text-lg mb-6">
              Join thousands of travelers exploring the world with TravelX
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/destinations" className="btn-primary">
                Explore Destinations
              </Link>
              <Link to="/contact" className="btn-outline">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default About
