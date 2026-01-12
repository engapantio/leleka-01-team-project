import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://goit-final-project-e6d7.onrender.com/api/',
  withCredentials: true,
});
