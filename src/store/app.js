import { makeAutoObservable } from 'mobx';

class AppStore {
  isSidebarVisible = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  openSidebar() {
    this.isSidebarVisible = true;
  }

  closeSidebar() {
    this.isSidebarVisible = false;
  }
}

export default new AppStore();
