import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Users, MapPin, Bookmark } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDestinations: 45,
    totalBookings: 128,
    totalUsers: 342,
    revenue: 28500,
  })

  return (
    <>
      <Navbar />

      <section className="container-custom section-padding">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="heading-lg mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 text-lg">Manage your travel platform</p>
          </div>
          <Link to="/admin/add-destination" className="btn-primary flex items-center gap-2">
            <Plus size={20} />
            Add Destination
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Destinations</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalDestinations}</p>
              </div>
              <MapPin size={40} className="text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalBookings}</p>
              </div>
              <Bookmark size={40} className="text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
              </div>
              <Users size={40} className="text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${stats.revenue.toLocaleString()}</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/add-destination"
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center hover:shadow-lg transition"
          >
            <Plus size={32} className="mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-2">Add Destination</h3>
            <p className="text-blue-100">Create a new destination</p>
          </Link>

          <Link
            to="/destinations"
            className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-8 text-center hover:shadow-lg transition"
          >
            <MapPin size={32} className="mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-2">View Destinations</h3>
            <p className="text-green-100">Manage existing destinations</p>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AdminDashboard
