import axios from 'axios';

// Get the token from localStorage or any secure storage you use
const getToken = () => localStorage.getItem('token');

const api = axios.create({
  baseURL: 'https://edtech-backend-3.onrender.com/api',
});

// Add an interceptor to include the Authorization header in each request
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
