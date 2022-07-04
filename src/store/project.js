import { makeAutoObservable } from 'mobx';

class ProjectStore {
  projectCategories = null;
  myNewProject = null;

  constructor() {
    makeAutoObservable(this);
  }

  setProjectCategories(projectCategories) {
    this.projectCategories = projectCategories;
  }

}

export default new ProjectStore();
