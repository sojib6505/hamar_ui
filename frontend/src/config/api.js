/**
 * config/api.js
 *
 * Centralized API configuration for HAMAR storefront & admin.
 * Strips any trailing slashes to prevent malformed requests.
 */

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
).replace(/\/+$/, '')

export default API_BASE_URL
