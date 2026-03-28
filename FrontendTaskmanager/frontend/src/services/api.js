import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const registerUser = (data) =>
  api.post('/api/v1/auth/register', data);

export const loginUser = (data) =>
  api.post('/api/v1/auth/login', data);

export const getMe = () =>
  api.get('/api/v1/auth/me');


export const createTask = (data) =>
  api.post('/api/v1/tasks/', data);

export const getMyTasks = () =>
  api.get('/api/v1/tasks/');

export const getTaskById = (id) =>
  api.get(`/api/v1/tasks/${id}`);

export const updateTask = (id, data) =>
  api.put(`/api/v1/tasks/${id}`, data);

export const deleteTask = (id) =>
  api.delete(`/api/v1/tasks/${id}`);

export const getAllTasks = () =>
  api.get('/api/v1/tasks/all');