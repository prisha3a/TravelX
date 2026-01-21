import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Calendar, Heart, Bookmark } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { bookingAPI } from '../services/api'

const Dashboard = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      console.log('Fetching bookings...');
      const response = await bookingAPI.getAll()
      console.log('Bookings response:', response)
      console.log('Bookings data:', response.data)
      console.log('User info:', user);
      setBookings(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
      console.error('Error details:', error.response?.data);
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <section className="container-custom section-padding">
        {/* Header */}
        <div className="mb-12">
          <h1 className="heading-lg mb-2">Welcome back, {user?.fullName || 'Traveler'}!</h1>
          <p className="text-gray-600 text-lg">Manage your travel bookings and saved destinations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
              </div>
              <Calendar size={40} className="text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Saved Destinations</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
              <Heart size={40} className="text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Saved Trips</p>
                <p className="text-3xl font-bold text-gray-900">5</p>
              </div>
              <Bookmark size={40} className="text-amber-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link
            to="/destinations"
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-bold mb-2">Explore Destinations</h3>
            <p className="text-blue-100">Discover new places to visit</p>
          </Link>

          <Link
            to="/favorites"
            className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg p-8 text-center hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-bold mb-2">View Favorites</h3>
            <p className="text-red-100">Check your saved destinations</p>
          </Link>
        </div>

        {/* Recent Bookings */}
        <div>
          <h2 className="heading-md mb-6">Recent Bookings</h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : bookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.slice(0, 6).map((booking) => (
                <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {booking.hotel?.name || 'Booking'}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 mt-1">
                        <MapPin size={16} />
                        <span className="text-sm">
                          {booking.hotel?.location?.city}, {booking.hotel?.location?.country}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Confirmed
                    </span>
                  </div>

                  <div className="mb-4 pb-4 border-b">
                    <p className="text-sm text-gray-600">
                      <strong>Check-in:</strong> {booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Check-out:</strong> {booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">
                      ${booking.totalPrice || 'N/A'}
                    </span>
                    <button className="btn-outline text-sm px-4 py-2">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg mb-4">No bookings yet</p>
              <Link to="/destinations" className="btn-primary">
                Start Exploring
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Dashboard
