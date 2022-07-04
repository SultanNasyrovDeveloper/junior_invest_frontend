import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  get id() {
    return _.get(this.user, 'id');
  }

  get email() {
    return _.get(this.user, 'email', 'Not found');
  }

  setUser(newUser) {
    this.user = newUser;
  }
}

export default new UserStore();
