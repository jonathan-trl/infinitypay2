import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jkbanco-83198023eca8.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('_a_t')
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
