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

  get youtubeVideoUrl() {
    return _.get(this.project, 'youtube_video_url');
  }

  setProject(project) {
    this.project = project;
  }

  setCurrentStep(step) {
    this.currentStep = step;
  }

  updateProject(project) {
    this.project = _.merge(this.project, project);
  }
}

export default new NewProjectStore()

