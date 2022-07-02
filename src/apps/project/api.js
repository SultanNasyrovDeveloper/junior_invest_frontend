// import _ from 'lodash';
//
// import { projectCategoriesUrl } from 'api/urls';
// import { apiClient } from 'app';
//
// import { projectActions } from './store';
//
// export const fetchProjectCategories = async (dispatch) => {
//   try {
//     const response = await apiClient.get(projectCategoriesUrl);
//     dispatch(
//       projectActions.setProjectCategories(
//         { categories: _.get(response, 'data.results') }
//       )
//     );
//   } catch(error) {
//     console.error(error);
//   }
// };
