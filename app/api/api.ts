import axios from 'axios';

export const backendApi = axios.create({
  // baseURL: 'https://leleka-api-eoo2.onrender.com/api/',
  baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true,
});
