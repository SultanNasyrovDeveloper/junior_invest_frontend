import { apiClient } from 'app';
import { tokenObtainUrl, getMyUserUrl } from 'urls';

import { IAuthCredentials } from './types';

export const fetchTokenPair = async (credentials: IAuthCredentials) => {
  const response = await apiClient.post(tokenObtainUrl, credentials);
  return response.data;
};

