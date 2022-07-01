import axios from 'axios';

import { tokenRefreshUrl } from 'urls';

import authService from './auth';

const baseURL = 'http://localhost:8000/api/v1/';

const client = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    ...authService.getAuthHeaders()
  }
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === 'undefined') {
      console.log(
        'A server/network error occurred. ' +
        'Looks like CORS might be the problem. ' +
        'Sorry about this - we will get it fixed shortly.'
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + tokenRefreshUrl
    ) {
      window.location.href = '/signin';
      return Promise.reject(error);
    }

    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      const refreshToken = authService.refreshToken;

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return client
            .post(tokenRefreshUrl, { refresh: refreshToken })
            .then((response) => {

              authService.accessToken = response.data.access;
              authService.refreshToken = response.data.refresh;

              client.defaults.headers['Authorization'] =
                'Bearer ' + response.data.access;
              originalRequest.headers['Authorization'] =
                'Bearer ' + response.data.access;

              return client(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log('Refresh token is expired', tokenParts.exp, now);
          authService.signout();
          window.location.href = '/signin';
        }
      } else {
        console.log('Refresh token not available.');
        window.location.href = '/signin';
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default client;

