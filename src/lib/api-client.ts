import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_BASE_URL
const apiKey = import.meta.env.VITE_API_KEY

if (!apiUrl) {
  throw new Error('VITE_API_BASE_URL environment variable is not set')
}

if (!apiKey) {
  throw new Error('VITE_API_KEY environment variable is not set')
}

export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
  },
})
