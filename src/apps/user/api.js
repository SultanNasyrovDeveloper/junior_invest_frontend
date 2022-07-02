import { client } from 'api';
import { myUserUrl } from 'api/urls';

import { userActions } from './store';

export const fetchMe = async (dispatch) => {
  try {
    const response = await client.get(myUserUrl);
    const user = response.data;
    dispatch(userActions.setUser({ user }));
  } catch(error) {
    console.error(error);
  }
};
