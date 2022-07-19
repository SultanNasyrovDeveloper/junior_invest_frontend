import axios from 'axios';
import _ from 'lodash';
import { makeAutoObservable, runInAction } from 'mobx';

import { client } from 'api';
import { pagesUrl, termsFilesUrl } from 'api/urls';

class AppStore {
  isSidebarVisible = false;
  terms = null;
  termFiles = null;
  about = null;
  policy = null;

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
    const queryParams = { 'url': '/terms' };
    const responses = await axios.all([
      client.get(pagesUrl, { params: queryParams }),
      client.get(termsFilesUrl)
    ]);
    const termsData = _.get(responses, '0.data.results.0');
    const files = _.get(responses, '1.data.results');
    runInAction(() => {
      this.terms = termsData;
      this.termFiles = files;
    });
  }

  async fetchAbout() {
    const queryParams = { 'url': '/about' }
    const response = await client.get(pagesUrl, { params: queryParams });
    const aboutData = _.get(response, 'data.results[0]');
    runInAction(() => {
      this.about = aboutData;
    })
  }

  async fetchPolicy() {
    const queryParams = { 'url': '/policy' }
    const response = await client.get(pagesUrl, { params: queryParams });
    const policyData = _.get(response, 'data.results[0]');
    runInAction(() => {
      this.policy = policyData;
    })
  }
}

export default new AppStore();
