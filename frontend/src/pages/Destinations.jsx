import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import DestinationCard from '../components/DestinationCard'
import { destinationAPI } from '../services/api'

const Destinations = () => {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    priceRange: 'all',
    rating: 'all',
  })

  useEffect(() => {
    fetchDestinations()
  }, [filters])

  const fetchDestinations = async () => {
    try {
      setLoading(true)
      const response = await destinationAPI.getAll({ limit: 50 })
      let filtered = response.data

      // Apply search filter
      if (filters.search) {
        filtered = filtered.filter(
          (dest) =>
            dest.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            dest.location?.city.toLowerCase().includes(filters.search.toLowerCase()) ||
            dest.location?.country.toLowerCase().includes(filters.search.toLowerCase())
        )
      }

      // Apply price filter
      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number)
        filtered = filtered.filter(
          (dest) => dest.pricePerNight >= min && dest.pricePerNight <= max
        )
      }

      // Apply rating filter
      if (filters.rating !== 'all') {
        const minRating = Number(filters.rating)
        filtered = filtered.filter((dest) => dest.rating >= minRating)
      }

      setDestinations(filtered)
    } catch (error) {
      console.error('Failed to fetch destinations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query) => {
    setFilters((prev) => ({ ...prev, search: query }))
    setSearchParams({ search: query })
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container-custom">
          <h1 className="heading-lg text-white mb-4">Explore Destinations</h1>
          <p className="text-blue-100 text-lg">
            Find your perfect travel destination from our curated collection
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <div className="flex items-center gap-2 mb-6">
                <Filter size={20} />
                <h2 className="text-lg font-bold">Filters</h2>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search..."
                  value={filters.search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters((prev) => ({ ...prev, priceRange: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Prices</option>
                  <option value="0-100">$0 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200-500">$200 - $500</option>
                  <option value="500-10000">$500+</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Minimum Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters((prev) => ({ ...prev, rating: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Ratings</option>
                  <option value="3">⭐ 3+</option>
                  <option value="4">⭐ 4+</option>
                  <option value="4.5">⭐ 4.5+</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Destinations Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : destinations.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    Found <span className="font-bold">{destinations.length}</span> destinations
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {destinations.map((destination) => (
                    <DestinationCard key={destination._id} destination={destination} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No destinations found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Destinations
