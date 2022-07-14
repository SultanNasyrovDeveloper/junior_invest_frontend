import _ from 'lodash';
import { makeAutoObservable, runInAction } from 'mobx';

import { client } from 'api';
import {
  fetchMeUrl,
  tokenObtainUrl,
  usersUrl,
  activateAccountUrl,
} from 'api/urls';
import {activateAccount} from "../apps/auth/api";

class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  get fullName() {
    if (this.user) {
      return `${this.user.last_name} ${this.user.first_name}`
    }
  }

  get email() {
    return _.get(this.user, 'email');
  }

  setUser(user) {
    this.user = user;
  }

  async fetchMe() {
    const response = await client.get(fetchMeUrl);
    runInAction(() => {
      this.user = response.data;
    });
  }

  async signin(credentials) {
    const response = await client.post(tokenObtainUrl, credentials);
    return response.data;
  }

  async signup(newUserData) {
    await client.post(usersUrl, newUserData);
  }

  async activateAccount(uid, token) {
    await client.post(activateAccountUrl, { uid, token });
  }
}


export default new UserStore();
