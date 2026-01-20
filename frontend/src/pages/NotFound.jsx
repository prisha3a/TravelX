import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const NotFound = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-2xl text-gray-600 mb-8">Page not found</p>
          <p className="text-gray-500 text-lg mb-8 max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
            <Link to="/destinations" className="btn-outline">
              Explore Destinations
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default NotFound
