import _ from 'lodash';
import { makeAutoObservable, runInAction } from 'mobx';

import { client } from 'api';
import { projectDetailUrl, projectsUrl } from 'api/urls';

class ProjectStore {
  projectCategories = null;
  projectsList = [];
  projectDetail = null;

  constructor() {
    makeAutoObservable(this);
  }

  setProjectCategories(projectCategories) {
    this.projectCategories = projectCategories;
  }

  setProjects(projectsList) {
    this.projectsList = projectsList;
  }

  addVote() {
    this.projectDetail['votes_count'] = this.projectDetail['votes_count'] + 1
  }

  isAlreadyVoted(userId) {
    return this.projectDetail?.votes.includes(userId);
  }

  async getProjectDetail(projectId) {
    try {
      const response = await client.get(projectDetailUrl(projectId));
      runInAction(() => {
        this.projectDetail = response.data;
      });
    }
    catch(error) {
      throw error;
    }
  }

  async fetchProjects(queryParams) {
    const response = await client.get(projectsUrl, { params: queryParams });
    const projects = _.get(response, 'data.results');
    runInAction(() => {
      this.projectsList = projects
    });
    return projects;
  }
}

export default new ProjectStore();
