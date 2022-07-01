import { accessTokenKey, refreshTokenKey, userKey } from '../constants';

const AuthService = class {

  get accessToken() {
    return localStorage.getItem(accessTokenKey);
  }

  get refreshToken() {
    return localStorage.getItem(refreshTokenKey);
  }

  get user() {
    return JSON.parse(localStorage.getItem(userKey));
  }

  set accessToken(accessToken) {
    localStorage.setItem(accessTokenKey, accessToken);
  }

  set refreshToken(refreshToken) {
    localStorage.setItem(refreshTokenKey, refreshToken);
  }

  set user(user) {
    localStorage.setItem(userKey, JSON.stringify(user));
  }

  getAuthData() {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      user: this.user
    }
  }

  getAuthHeaders() {
    const authHeaders = {};
    if (this.accessToken) {
      authHeaders['Authorization'] = `Bearer ${localStorage.getItem(accessTokenKey)}`;
    }
    return authHeaders;
  }

  setAuthData(data) {
    this.accessToken = data.access;
    this.refreshToken = data.refresh;
    this.user = data.user;
  }

  removeAuthData = () => {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
    localStorage.removeItem(userKey);
  };

};

export default new AuthService();




