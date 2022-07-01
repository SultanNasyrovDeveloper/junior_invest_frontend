import { apiClient } from 'app';
import { tokenObtainUrl } from 'urls';

export const fetchTokenPair = async (credentials) => {
  const response = await apiClient.post(tokenObtainUrl, credentials);
  return response.data;
};

