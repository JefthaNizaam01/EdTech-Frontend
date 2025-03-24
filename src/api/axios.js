import axios from "axios";

const getToken = () => localStorage.getItem("token");

const api = axios.create({
  baseURL: "https://edtech-backend-3.onrender.com/api",
});

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
