import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

class ProjectStore {
  projectCategories = null;
  myNewProject = null;
  newProjectFormStep = null;

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

  setNewProjectFormStep(step) {
    this.newProjectFormStep = step;
  }
}

export default new ProjectStore();
