import _ from 'lodash';
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

  setMyNewProject(newProject) {
    this.myNewProject = newProject;
  }

  updateMyNewProject(updateData) {
    this.myNewProject = _.merge(this.myNewProject, updateData);
  }
}

export default new ProjectStore();
