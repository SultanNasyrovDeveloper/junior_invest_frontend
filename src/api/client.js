import { message } from 'antd';
import axios from 'axios';

import { AuthService } from 'apps/auth';

import { tokenObtainUrl, tokenRefreshUrl } from './urls';

const client = axios.create({
  baseURL: 'https://juniorinvest.ru/api/v1/',
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

    if (error.code === 'ERR_NETWORK') {
      message.error('Не получается подключится к серверу. Проверьте свое интернет соединение или обратитесь к администратору сервера')
    }

    const logout = () => {
      AuthService.logout();
      window.location.replace('/signin');
    }

    if (error.response?.status === 401) {
      if (originalConfig.url === tokenObtainUrl) {
        return Promise.reject(error);
      }

      if (originalConfig.url === tokenObtainUrl) {
        return logout();
      }

      if (!AuthService.accessToken) {
        return logout();
      }

      if (originalConfig.retry) {
        return logout();
      }

      originalConfig.retry = true;
      const response = await client.post(
        tokenRefreshUrl, { refresh: AuthService.refreshToken }
      );
      const newAccessToken = response.data.access;
      AuthService.accessToken = newAccessToken;
      originalConfig.Authorization = `JWT ${newAccessToken}`;
      return client.request(originalConfig);
    }

    return Promise.reject(error);
});

export default client;
