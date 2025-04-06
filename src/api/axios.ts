import axios from 'axios';

// 기본 API URL은 환경변수 또는 직접 입력
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true, // credentials: 'include'와 동일한 역할
});

export default axiosInstance;
