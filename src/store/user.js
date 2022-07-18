import _ from 'lodash';
import { makeAutoObservable, runInAction } from 'mobx';

import { client } from 'api';
import {
  fetchMeUrl,
  tokenObtainUrl,
  usersUrl,
  activateAccountUrl,
  projectsUrl,
  projectVotesUrl
} from 'api/urls';
import payloadasync from "async";

class UserStore {
  user = null;
  myProjects = null;

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

  async updateUser(userId, newUserData) {
    const response = await client.patch(fetchMeUrl, newUserData);
     runInAction(() => {
       if (userId === this.user.id) {
         this.user = _.merge(this.user, response.data);
       }
     });
  }

  async fetchMyProjects() {
    const response = await client.get(
      projectsUrl,
      { params: { author: this.user.id }}
    );
    const myProjects = _.get(response, 'data.results');
    runInAction(() => {
      this.myProjects = myProjects;
    });
    return myProjects;
  }

  async vote(projectId) {
    const payload = { user: this.user.id, project: projectId }
    await client.post(projectVotesUrl, payload);
  }

  async activateAccount(uid, token) {
    await client.post(activateAccountUrl, { uid, token });
  }
}


export default new UserStore();
