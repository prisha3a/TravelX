import { Link } from 'react-router-dom'
import { Heart, MapPin, Star } from 'lucide-react'
import { useState } from 'react'

const DestinationCard = ({ destination, onAddFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavorite = (e) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
    if (onAddFavorite) {
      onAddFavorite(destination._id)
    }
  }

  return (
    <Link to={`/destinations/${destination._id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <img
            src={destination.images?.[0] || 'https://via.placeholder.com/400x300'}
            alt={destination.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
          >
            <Heart
              size={20}
              className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
            {destination.name}
          </h3>

          <div className="flex items-center gap-2 mb-3 text-gray-600">
            <MapPin size={16} />
            <span className="text-sm">
              {destination.location?.city}, {destination.location?.country}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {destination.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-gray-900">
                {destination.rating?.toFixed(1) || '4.5'}
              </span>
            </div>

            {destination.pricePerNight && (
              <div className="text-right">
                <span className="text-sm text-gray-600">from</span>
                <p className="text-lg font-bold text-blue-600">
                  ${destination.pricePerNight}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default DestinationCard
