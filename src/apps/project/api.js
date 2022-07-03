import _ from 'lodash';

import {
  projectCategoriesUrl,
  projectsUrl,
  projectDetailUrl
} from 'api/urls';
import { client } from 'api';

export const fetchProjectCategories = async (dispatch) => {
  try {
    const response = await client.get(
      projectCategoriesUrl,
      { params: { limit: 5000 }}
    );
    return _.get(response, 'data.results')
  } catch(error) {
    console.error(error);
    throw error;
  }
};

export const fetchMyNewProject = async (userId) => {
  try {
    const queryParams = {
      filled: false,
      author: userId,
      limit: 1
    }
    const response = await client.get(projectsUrl, { params: queryParams });
    return  _.get(response, 'data.results.0');
  } catch(error) {
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await client.post(projectsUrl, projectData);
    return _.get(response, 'data');
  }
  catch(error) {
    throw error;
  }
};

export const updateProject = async (projectId, updateData) => {
  try {
    const response = await client.patch(projectDetailUrl(projectId), updateData);
    return _.get(response, 'data');
  }
  catch(error) {
    throw error;
  }
};
