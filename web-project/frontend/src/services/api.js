import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
});

// Request interceptor for adding the authentication token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors (e.g., token expiration)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check if error response exists and matches 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
            // Clear storage and maybe redirect to login (implementation depends on router availability in this scope)
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // window.location.href = '/login'; // Optional: force redirect
        }
        return Promise.reject(error);
    }
);

export default api;
