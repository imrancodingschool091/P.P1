import axios from 'axios';
import { store } from '../app/store';
import { setAccessToken,logoutLocal } from '../features/auth/AuthSlice';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // include cookies
});

// Attach access token from Redux state to every request
API.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to auto-refresh token on 401
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only retry once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh token endpoint
        const res = await API.post('/auth/refresh');
        const { accessToken } = res.data;

        // Update Redux store
        store.dispatch(setAccessToken(accessToken));

        // Retry original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return API(originalRequest);
      } catch (e) {
        // Refresh failed, logout user
        store.dispatch(logoutLocal());
        window.location.href = '/login';
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
