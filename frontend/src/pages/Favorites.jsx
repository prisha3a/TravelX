import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DestinationCard from '../components/DestinationCard'
import { favoriteAPI } from '../services/api'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const response = await favoriteAPI.getAll()
      setFavorites(response.data)
    } catch (error) {
      console.error('Failed to fetch favorites:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFavorite = async (destinationId) => {
    try {
      await favoriteAPI.remove(destinationId)
      setFavorites((prev) => prev.filter((fav) => fav._id !== destinationId))
    } catch (error) {
      console.error('Failed to remove favorite:', error)
    }
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-red-600 text-white py-12">
        <div className="container-custom">
          <div className="flex items-center gap-3">
            <Heart size={32} className="fill-white" />
            <h1 className="heading-lg text-white">Your Favorite Destinations</h1>
          </div>
          <p className="text-red-100 text-lg mt-2">
            {favorites.length} {favorites.length === 1 ? 'destination' : 'destinations'} saved
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom section-padding">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((destination) => (
              <div key={destination._id} className="relative">
                <DestinationCard destination={destination} />
                <button
                  onClick={() => handleRemoveFavorite(destination._id)}
                  className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition z-10"
                  title="Remove from favorites"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="heading-md text-gray-900 mb-4">No favorites yet</h2>
            <p className="text-gray-600 text-lg mb-8">
              Start exploring and save your favorite destinations!
            </p>
            <Link to="/destinations" className="btn-primary">
              Explore Destinations
            </Link>
          </div>
        )}
      </section>

      <Footer />
    </>
  )
}

export default Favorites
