import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this);

  }

  get email() {
    return _.get(this.user, 'email');
  }

  setUser(user) {
    this.user = user;
  }
}


export default new UserStore();
