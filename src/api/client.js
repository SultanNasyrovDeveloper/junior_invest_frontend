import axios from 'axios';

import { AuthService } from 'apps/auth';

import { tokenRefreshUrl } from './urls';

const client = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
  timeout: 10000,
});

client.interceptors.request.use(
  config => {
    const authHeaders = AuthService.accessToken
      ? { Authorization: `JWT ${AuthService.accessToken}` }
      : {};

    config.headers = {
      ...config.headers,
      ...authHeaders,
      'Accept': 'application/json',
    }
    return config;
  },
  error => {
    Promise.reject(error)
  }
);

client.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {

    const originalConfig = error.config;
    const logout = () => {
      AuthService.logout();
      window.location.replace('/login');
    }

    if (!AuthService.accessToken) {
      logout();
    }

    if (originalConfig.retry) {
      logout();
    }

    try {
      originalConfig.retry = true;
      const response = await client.post(
        tokenRefreshUrl, { refresh: AuthService.refreshToken }
      );
      const newAccessToken = response.data.access;
      AuthService.accessToken = newAccessToken;
      originalConfig.Authorization = `JWT ${newAccessToken}`;
      return client.request(originalConfig);
    } catch(error) {
      return logout();
    }
});

export default client;
