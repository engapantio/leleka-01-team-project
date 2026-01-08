import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://lehlehka-render.onrender.com/api/',
  withCredentials: true,
});
