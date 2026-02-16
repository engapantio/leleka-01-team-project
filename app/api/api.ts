import axios from 'axios';

export const backendApi = axios.create({
  baseURL: 'https://leleka-api-eoo2.onrender.com/api/',
  withCredentials: true,
});
