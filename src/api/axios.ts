// src/api/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true, // クッキーを含める
  headers: {
    'Content-Type': 'application/json', // JSON で送信
  },
});

export default axiosInstance;
