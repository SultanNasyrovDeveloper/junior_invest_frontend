

export const tokenObtainUrl = 'auth/jwt/create/';
export const tokenRefreshUrl = 'auth/jwt/refresh/';

export const activateAccountUrl = 'auth/users/activation/';
export const usersUrl = 'auth/users/';
export const myUserUrl = 'auth/users/me/';
export const fetchMeUrl = 'auth/users/me/';
export const userDetailUrl = (userId) => `auth/users/${userId}/`;

export const projectCategoriesUrl = 'project/categories/';

export const projectsUrl = 'project/projects/';
export const projectDetailUrl = (projectId) => {
  return `project/projects/${projectId}/`;
};
export const projectImagesUrl = 'project/images/';
export const projectImageDetailUrl = (imageId) => `project/images/${imageId}/`;
