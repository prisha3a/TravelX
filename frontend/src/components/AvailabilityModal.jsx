import { X, Calendar, Users } from 'lucide-react'

const AvailabilityModal = ({ isOpen, onClose, destination }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Availability</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Destination Name */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">{destination?.name || 'Destination'}</h3>
            <p className="text-sm text-gray-600">
              {destination?.location?.city}, {destination?.location?.country}
            </p>
          </div>

          {/* Availability Status */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-semibold text-green-900">Available</span>
            </div>
            <p className="text-sm text-green-800">
              This destination has available rooms. You can proceed with booking your preferred dates.
            </p>
          </div>

          {/* Pricing Info */}
          {destination?.pricePerNight && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Starting Price</p>
              <p className="text-2xl font-bold text-blue-600">${destination.pricePerNight}/night</p>
            </div>
          )}

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-blue-600" />
              <span className="text-gray-700 text-sm">Flexible check-in/check-out</span>
            </div>
            <div className="flex items-center gap-3">
              <Users size={18} className="text-blue-600" />
              <span className="text-gray-700 text-sm">Multiple guest options available</span>
            </div>
          </div>

          {/* Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              <span className="font-semibold">Note: </span>Availability is subject to real-time updates. Please complete your booking to confirm reservation.
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default AvailabilityModal
