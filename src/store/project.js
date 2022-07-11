import { makeAutoObservable } from 'mobx';

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

}

export default new ProjectStore();
