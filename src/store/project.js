import { makeAutoObservable } from 'mobx';

class ProjectStore {
  projectCategories = null;
  projectList = [];
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
