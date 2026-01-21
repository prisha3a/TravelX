import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { bookingAPI } from '../services/api'

const BookingForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    numberOfDays: 1,
    numberOfGuests: 1,
    checkInDate: '',
    checkOutDate: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfDays' || name === 'numberOfGuests' ? parseInt(value) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validate form
      if (!formData.numberOfDays || !formData.numberOfGuests || !formData.checkInDate || !formData.checkOutDate) {
        setError('Please fill in all required fields')
        setLoading(false)
        return
      }

      if (formData.numberOfDays < 1 || formData.numberOfGuests < 1) {
        setError('Days and guests must be at least 1')
        setLoading(false)
        return
      }

      // Create booking
      const bookingData = {
        hotelId: id,
        numberOfDays: formData.numberOfDays,
        numberOfGuests: formData.numberOfGuests,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
      }

      console.log('Submitting booking:', bookingData);
      const response = await bookingAPI.create(bookingData)
      console.log('Booking response:', response);
      
      if (response.data) {
        alert('Booking confirmed successfully!')
        navigate('/dashboard')
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to create booking. Please try again.'
      setError(errorMessage)
      console.error('Booking error:', err)
      console.error('Error response:', err.response?.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <section className="container-custom section-padding">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ChevronLeft size={20} />
          Back
        </button>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="heading-lg mb-2">Complete Your Booking</h1>
            <p className="text-gray-600 mb-8">Please provide your booking details below</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Number of Days */}
              <div>
                <label htmlFor="numberOfDays" className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Days <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="numberOfDays"
                  name="numberOfDays"
                  min="1"
                  value={formData.numberOfDays}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Number of Guests */}
              <div>
                <label htmlFor="numberOfGuests" className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Guests <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="numberOfGuests"
                  name="numberOfGuests"
                  min="1"
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Check-in Date */}
              <div>
                <label htmlFor="checkInDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-in Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="checkInDate"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Check-out Date */}
              <div>
                <label htmlFor="checkOutDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-out Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="checkOutDate"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Booking Summary */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Booking Summary</h3>
                <p className="text-gray-600 text-sm">
                  Duration: <span className="font-semibold">{formData.numberOfDays} {formData.numberOfDays === 1 ? 'day' : 'days'}</span>
                </p>
                <p className="text-gray-600 text-sm">
                  Guests: <span className="font-semibold">{formData.numberOfGuests} {formData.numberOfGuests === 1 ? 'guest' : 'guests'}</span>
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default BookingForm
