import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MapPin, Star, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { destinationAPI } from '../services/api'
import AvailabilityModal from '../components/AvailabilityModal'

const DestinationDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [destination, setDestination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showAvailability, setShowAvailability] = useState(false)

  useEffect(() => {
    fetchDestination()
  }, [id])

  const fetchDestination = async () => {
    try {
      const response = await destinationAPI.getById(id)
      setDestination(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch destination:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </>
    )
  }

  if (!destination) {
    return (
      <>
        <Navbar />
        <div className="container-custom section-padding text-center">
          <h1 className="heading-md mb-4">Destination not found</h1>
          <Link to="/destinations" className="btn-primary">
            Back to Destinations
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  const images = destination.images || ['https://via.placeholder.com/800x600']

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <Navbar />

      <section className="container-custom section-padding">
        {/* Back Button */}
        <Link to="/destinations" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
          <ChevronLeft size={20} />
          Back to Destinations
        </Link>

        {/* Image Gallery */}
        <div className="relative mb-8 rounded-lg overflow-hidden bg-gray-200 h-96">
          <img
            src={images[currentImageIndex]}
            alt={destination.name}
            className="w-full h-full object-cover"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <ChevronRight size={24} />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="flex gap-2 mb-8 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  index === currentImageIndex ? 'border-blue-600' : 'border-gray-300'
                }`}
              >
                <img src={image} alt={`${destination.name} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="heading-lg mb-2">{destination.name}</h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin size={20} />
                    <span className="text-lg">
                      {destination.location?.city}, {destination.location?.country}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-3 rounded-full border border-gray-300 hover:bg-gray-50 transition"
                  >
                    <Heart
                      size={24}
                      className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                    />
                  </button>
                  <button className="p-3 rounded-full border border-gray-300 hover:bg-gray-50 transition">
                    <Share2 size={24} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < Math.floor(destination.rating || 4.5)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">{destination.rating?.toFixed(1) || '4.5'}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="heading-md mb-4">About</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{destination.description}</p>
            </div>

            {/* Best Time to Visit */}
            <div className="mb-8">
              <h2 className="heading-md mb-4">Best Time to Visit</h2>
              <p className="text-gray-600 text-lg">
                {destination.bestTimeToVisit || 'Check back for availability information'}
              </p>
            </div>

            {/* Amenities */}
            {destination.amenities && destination.amenities.length > 0 && (
              <div className="mb-8">
                <h2 className="heading-md mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {destination.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <span className="text-xl">✓</span>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Review Section */}
            <div className="mb-8">
              <h2 className="heading-md mb-4">Reviews</h2>
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">No reviews yet. Be the first to review!</p>
                <Link to={`/review/${destination._id}`} className="btn-primary">
                  Write a Review
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              {destination.pricePerNight && (
                <>
                  <div className="mb-6">
                    <p className="text-gray-600 text-sm mb-1">Starting from</p>
                    <p className="text-4xl font-bold text-blue-600 mb-2">
                      ${destination.pricePerNight}
                    </p>
                    <p className="text-gray-600 text-sm">per night</p>
                  </div>

                  <button
                    onClick={() => navigate(`/booking/${destination._id}`)}
                    className="btn-secondary w-full mb-3"
                  >
                    Book Now
                  </button>
                </>
              )}

              <button
                onClick={() => setShowAvailability(true)}
                className="btn-outline w-full"
              >
                Check Availability
              </button>

              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <p className="text-sm text-gray-600 mb-2">📧 info@travelx.com</p>
                <p className="text-sm text-gray-600">📞 +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AvailabilityModal
        isOpen={showAvailability}
        onClose={() => setShowAvailability(false)}
        destination={destination}
      />

      <Footer />
    </>
  )
}

export default DestinationDetails
