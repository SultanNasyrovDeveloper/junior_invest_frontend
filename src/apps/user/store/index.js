import { makeAutoObservable } from 'mobx';

class UserStore {
  user = {};

  constructor() {
    makeAutoObservable(this);
  }
}
