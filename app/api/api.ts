import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://render.com****/',
  withCredentials: true,
});
