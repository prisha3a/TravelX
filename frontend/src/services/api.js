import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth endpoints
export const authAPI = {
  signup: (data) => apiClient.post('/api/auth/signup', data),
  login: (data) => apiClient.post('/api/auth/login', data),
  logout: () => apiClient.post('/api/auth/logout'),
}

// Destinations/Hotels endpoints
export const destinationAPI = {
  getAll: (params) => apiClient.get('/api/destinations', { params }),
  getById: (id) => apiClient.get(`/api/destinations/${id}`),
  search: (query) => apiClient.get(`/api/destinations`, { params: { search: query } }),
}

// Bookings endpoints
export const bookingAPI = {
  create: (data) => apiClient.post('/api/bookings', data),
  getAll: () => apiClient.get('/api/bookings'),
  getById: (id) => apiClient.get(`/api/bookings/${id}`),
}

// Reviews endpoints
export const reviewAPI = {
  create: (data) => apiClient.post('/api/reviews', data),
  getByDestination: (destinationId) =>
    apiClient.get(`/api/destinations/${destinationId}/reviews`),
}

// Favorites endpoints
export const favoriteAPI = {
  getAll: () => apiClient.get('/api/favorites'),
  add: (destinationId) => apiClient.post('/api/favorites', { destinationId }),
  remove: (destinationId) => apiClient.delete(`/api/favorites/${destinationId}`),
}

// User endpoints
export const userAPI = {
  getProfile: () => apiClient.get('/api/users/profile'),
  updateProfile: (data) => apiClient.put('/api/users/profile', data),
}

export default apiClient
