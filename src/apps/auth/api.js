import _ from 'lodash';

import { client } from '../../api';
import {
  tokenObtainUrl,
  usersUrl,
  activateAccountUrl
} from '../../api/urls';

export const signin = async (credentials) => {
  const response = await client.post(tokenObtainUrl, credentials);
  return _.get(response, 'data');
};

export const signup = async (credentials) => {
  return await client.post(usersUrl, credentials);
};

export const activateAccount = async (uid, token) => {
  return await client.post(activateAccountUrl, { uid, token });
};
