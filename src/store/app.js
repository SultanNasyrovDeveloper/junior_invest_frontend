import _ from 'lodash';
import { makeAutoObservable, runInAction } from 'mobx';

import { client } from 'api';
import { pagesUrl } from 'api/urls';

class AppStore {
  isSidebarVisible = false;
  terms = null;
  about = null;

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

  async fetchTerms() {
    const queryParams = { 'url': '/terms' }
    const response = await client.get(pagesUrl, { params: queryParams });
    const termsData = _.get(response, 'data.results[0]');
    runInAction(() => {
      this.terms = termsData;
    })
  }

  async fetchAbout() {
    const queryParams = { 'url': '/about' }
    const response = await client.get(pagesUrl, { params: queryParams });
    const aboutData = _.get(response, 'data.results[0]');
    runInAction(() => {
      this.about = aboutData;
    })
  }
}

export default new AppStore();
