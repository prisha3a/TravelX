import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, Plus, X } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const AddDestination = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    city: '',
    country: '',
    images: [],
    pricePerNight: '',
    rating: '4.5',
    amenities: [],
  })
  const [imageUrl, setImageUrl] = useState('')
  const [amenity, setAmenity] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }))
      setImageUrl('')
    }
  }

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleAddAmenity = () => {
    if (amenity.trim()) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenity],
      }))
      setAmenity('')
    }
  }

  const handleRemoveAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.name || !formData.description || !formData.city || !formData.country) {
      setError('Please fill in all required fields')
      return
    }

    if (formData.images.length === 0) {
      setError('Please add at least one image')
      return
    }

    setLoading(true)

    try {
      // API call would go here
      console.log('Submitting destination:', formData)
      alert('Destination added successfully!')
      navigate('/admin')
    } catch (err) {
      setError('Failed to add destination')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <section className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="heading-lg mb-2">Add New Destination</h1>
            <p className="text-gray-600 text-lg">Create a new travel destination</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="text-red-600 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Basic Information */}
            <fieldset className="mb-8 pb-8 border-b">
              <legend className="text-xl font-bold text-gray-900 mb-6">Basic Information</legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Destination Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Eiffel Tower"
                  />
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="pricePerNight" className="block text-sm font-medium text-gray-700 mb-2">
                    Price Per Night ($) *
                  </label>
                  <input
                    type="number"
                    id="pricePerNight"
                    name="pricePerNight"
                    value={formData.pricePerNight}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="150"
                    min="0"
                  />
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Paris"
                  />
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="France"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="4.5"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the destination..."
                />
              </div>
            </fieldset>

            {/* Images */}
            <fieldset className="mb-8 pb-8 border-b">
              <legend className="text-xl font-bold text-gray-900 mb-6">Images</legend>

              <div className="flex gap-3 mb-6">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Image URL..."
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add Image
                </button>
              </div>

              {formData.images.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    {formData.images.length} image(s) added
                  </p>
                  <div className="space-y-2">
                    {formData.images.map((image, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm text-gray-600 truncate">{image}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </fieldset>

            {/* Amenities */}
            <fieldset className="mb-8">
              <legend className="text-xl font-bold text-gray-900 mb-6">Amenities</legend>

              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={amenity}
                  onChange={(e) => setAmenity(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Swimming Pool, WiFi, Gym..."
                />
                <button
                  type="button"
                  onClick={handleAddAmenity}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add Amenity
                </button>
              </div>

              {formData.amenities.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    {formData.amenities.length} amenity(ies) added
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.amenities.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full"
                      >
                        <span className="text-sm">{item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAmenity(index)}
                          className="hover:text-blue-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </fieldset>

            {/* Submit Button */}
            <div className="flex gap-3 pt-8">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : 'Add Destination'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AddDestination
