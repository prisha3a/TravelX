import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { destinationAPI, reviewAPI } from '../services/api'

const ReviewPage = () => {
  const { destinationId } = useParams()
  const navigate = useNavigate()
  const [destination, setDestination] = useState(null)
  const [rating, setRating] = useState(5)
  const [hoveredStar, setHoveredStar] = useState(null)
  const [reviewText, setReviewText] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchDestination()
  }, [destinationId])

  const fetchDestination = async () => {
    try {
      const response = await destinationAPI.getById(destinationId)
      setDestination(response.data)
    } catch (err) {
      console.error('Failed to fetch destination:', err)
      setError('Destination not found')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await reviewAPI.create({
        destinationId,
        rating,
        reviewText,
      })
      setSuccess(true)
      setTimeout(() => {
        navigate(`/destinations/${destinationId}`)
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review')
    } finally {
      setSubmitting(false)
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
          <button onClick={() => navigate('/destinations')} className="btn-primary">
            Back to Destinations
          </button>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <section className="container-custom section-padding">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="heading-lg mb-4">Write a Review</h1>
            <p className="text-gray-600 text-lg">
              Share your experience at {destination.name}
            </p>
          </div>

          {/* Review Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                Thank you! Your review has been submitted successfully.
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="text-red-600 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Destination Info */}
              <div className="pb-6 border-b">
                <h2 className="text-lg font-bold text-gray-900">{destination.name}</h2>
                <p className="text-gray-600">{destination.location?.city}, {destination.location?.country}</p>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  How would you rate this destination?
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(null)}
                      className="focus:outline-none transition"
                    >
                      <Star
                        size={48}
                        className={`${
                          (hoveredStar || rating) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label htmlFor="review" className="block text-lg font-semibold text-gray-900 mb-3">
                  Your Review
                </label>
                <textarea
                  id="review"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Share your experience... (at least 20 characters)"
                />
                <p className="text-sm text-gray-500 mt-2">
                  {reviewText.length} characters
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || reviewText.length < 20}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default ReviewPage
