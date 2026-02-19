import axios from 'axios';

export const backendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_FRONT,
  // baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true,
});
