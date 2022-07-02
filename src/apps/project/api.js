import _ from 'lodash';

import { projectCategoriesUrl, projectsUrl } from 'api/urls';
import { client } from 'api';

import { projectActions } from './store';

export const fetchProjectCategories = async (dispatch) => {
  try {
    const response = await client.get(projectCategoriesUrl);
    dispatch(
      projectActions.setProjectCategories(
        { categories: _.get(response, 'data.results') }
      )
    );
  } catch(error) {
    console.error(error);
    throw error;
  }
};

export const fetchMyNewProject = async (dispatch, getState) => {
  const state = getState();
  try {
    const queryParams = {
      filled: false,
      author: state.user.user.id,
      limit: 1
    }
    const response = await client.get(projectsUrl, { params: queryParams });
    const myNewProject = _.get(response, 'data.results.0');
    if (myNewProject) {
      dispatch(projectActions.setNewProject(
        { project: myNewProject }
      ));
    }
  } catch(error) {
    throw error;
  }
};

export const createProject = (projectData) => async (dispatch) => {
  try {
    const response = await client.post(projectsUrl, projectData);

  }
  catch(error) {
    throw error;
  }
};
