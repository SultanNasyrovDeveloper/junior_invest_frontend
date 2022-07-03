
export const tokenObtainUrl = 'auth/jwt/create/';
export const tokenRefreshUrl = 'auth/jwt/refresh/';

export const myUserUrl = 'auth/users/me/';

export const projectCategoriesUrl = 'project/project_categories/';

export const projectsUrl = 'project/projects/';
export const projectDetailUrl = (projectId) => {
  return `project/projects/${projectId}/`;
}
