import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, MapPin, Users, Globe } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import DestinationCard from '../components/DestinationCard'
import { destinationAPI } from '../services/api'

const Home = () => {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchFeaturedDestinations()
  }, [])

  const fetchFeaturedDestinations = async () => {
    try {
      const response = await destinationAPI.getAll({ limit: 6 })
      setDestinations(response.data)
    } catch (error) {
      console.error('Failed to fetch destinations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query) => {
    navigate(`/destinations?search=${query}`)
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center">
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop")',
          }}
        ></div>

        <div className="container-custom relative z-10 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            Explore the World with TravelX
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-blue-100">
            Discover amazing destinations and create unforgettable memories
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          <Link to="/destinations" className="btn-secondary text-lg inline-flex items-center gap-2">
            Explore Destinations <ChevronRight />
          </Link>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="container-custom section-padding">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Featured Destinations</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover some of the most beautiful and exciting destinations around the world
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {destinations.map((destination) => (
              <DestinationCard key={destination._id} destination={destination} />
            ))}
          </div>
        )}

        <div className="text-center">
          <Link to="/destinations" className="btn-primary">
            View All Destinations
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Globe size={48} className="mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">500+</h3>
              <p className="text-blue-100">Destinations</p>
            </div>
            <div>
              <Users size={48} className="mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">50K+</h3>
              <p className="text-blue-100">Happy Travelers</p>
            </div>
            <div>
              <MapPin size={48} className="mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">100+</h3>
              <p className="text-blue-100">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom section-padding text-center">
        <h2 className="heading-md mb-4">Ready to Start Your Journey?</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of travelers who have discovered amazing destinations with TravelX
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup" className="btn-primary">
            Create an Account
          </Link>
          <Link to="/destinations" className="btn-outline">
            Explore Now
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home
