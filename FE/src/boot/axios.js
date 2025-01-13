import axios from 'axios';

console.log(process.env.VUE_APP_API_URL)

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // URL backend
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // Kirim cookie atau token autentikasi
});

export default axiosInstance;
