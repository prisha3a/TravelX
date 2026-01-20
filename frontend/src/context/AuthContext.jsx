import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken')
      if (token) {
        // Optionally verify token with backend
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch (err) {
      console.error('Auth check error:', err)
      setLoading(false)
    }
  }

  const signup = async (userData) => {
    try {
      setError(null)
      const response = await axios.post(`${API_URL}/api/auth/signup`, userData, {
        withCredentials: true,
      })
      setUser(response.data)
      return response.data
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Signup failed'
      setError(errorMsg)
      throw err
    }
  }

  const login = async (credentials) => {
    try {
      setError(null)
      const response = await axios.post(`${API_URL}/api/auth/login`, credentials, {
        withCredentials: true,
      })
      setUser(response.data)
      return response.data
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Login failed'
      setError(errorMsg)
      throw err
    }
  }

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, {
        withCredentials: true,
      })
      setUser(null)
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    isAuthenticated: !!user || !!localStorage.getItem('authToken'),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
