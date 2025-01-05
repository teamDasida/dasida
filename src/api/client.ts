import axios from 'axios';
const token = localStorage.getItem('accessToken');

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type':  `Bearer ${token}`,
  },
});

export default apiClient;
