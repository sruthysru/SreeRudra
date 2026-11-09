import axios from 'axios';

const API = axios.create({
  baseURL: 'https://sreerudra-1.onrender.com',
});



// Automatically attach admin token if available in localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
})
export default API;