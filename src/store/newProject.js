import _ from "lodash";
import { makeAutoObservable } from 'mobx';


class NewProjectStore {
  project = null;
  currentStep = null;

  constructor() {
    makeAutoObservable(this);
  }

  get id() {
    return _.get(this.project, 'id');
  }

  get presentation() {
    return _.get(this.project, 'presentation');
  }

  get media() {
    return _.get(this.project, 'media');
  }

  get images() {
    return _.get(this.project, 'images');
  }

  setProject(project) {
    this.project = project;
  }

  deleteProject() {
    this.project = null;
  }

  setCurrentStep(step) {
    this.currentStep = step;
  }

  updateProject(project) {
    this.project = _.merge(this.project, project);
  }

  addProjectImage(image) {
    this.project.images.push(image);
  }

  deleteProjectImage(imageId) {
    this.project.images = this.project?.images.filter(
      image => image.id !== imageId
    );
  }
}

export default new NewProjectStore()

