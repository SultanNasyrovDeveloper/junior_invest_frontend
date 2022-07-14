import { makeAutoObservable, runInAction } from 'mobx';
import { client } from 'api';
import { projectDetailUrl } from 'api/urls';

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

}

export default new ProjectStore();
