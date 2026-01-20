import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">✈️ TravelX</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/destinations" className="text-gray-700 hover:text-blue-600 transition">
              Destinations
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/favorites" className="text-gray-700 hover:text-blue-600 transition">
                  ❤️ Favorites
                </Link>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition flex items-center gap-2">
                  <User size={18} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-primary flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="btn-outline">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t">
            <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/destinations" className="block py-2 text-gray-700 hover:text-blue-600">
              Destinations
            </Link>
            <Link to="/about" className="block py-2 text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link to="/contact" className="block py-2 text-gray-700 hover:text-blue-600">
              Contact
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/favorites" className="block py-2 text-gray-700 hover:text-blue-600">
                  ❤️ Favorites
                </Link>
                <Link to="/dashboard" className="block py-2 text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 btn-primary text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2 mt-4">
                <Link to="/login" className="block btn-outline w-full text-center">
                  Login
                </Link>
                <Link to="/signup" className="block btn-primary w-full text-center">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
