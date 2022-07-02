import { accessTokenKey, refreshTokenKey, userKey } from './constants';

class AuthService {

  static get accessToken() {
    return localStorage.getItem(accessTokenKey);
  }

  static get refreshToken() {
    return localStorage.getItem(refreshTokenKey);
  }

  static set accessToken(token) {
    localStorage.setItem(accessTokenKey, token);
  }

  static set refreshToken(token) {
    localStorage.setItem(refreshTokenKey, token);
  }

  static get isLoggedIn() {
    return !!localStorage.getItem(accessTokenKey);
  }

  static login(authData) {
    AuthService.accessToken = authData.access;
    AuthService.refreshToken = authData.refresh;
  }

  static logout() {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
  }

}

export default AuthService;
