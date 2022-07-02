import { client } from 'api';
import { myUserUrl } from 'api/urls';

import { userActions } from './store';

export const fetchMe = async (dispatch) => {
  try {
    console.log('Dispatching fetch my user...')
    const response = await client.get(myUserUrl);
    const user = response.data;
    dispatch(userActions.setUser({ user }));
    console.log('My user fetched successfully')
  } catch(error) {
    console.log('my user dispatched with error')
    console.error(error);
  }
};
