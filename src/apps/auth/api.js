import _ from 'lodash';

import { client } from 'api';
import { tokenObtainUrl } from 'api/urls';

export const login = async (credentials) => {
  const response = await client.post(tokenObtainUrl, credentials);
  return _.get(response, 'data');
};

