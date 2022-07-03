import { client } from 'api';
import { myUserUrl } from 'api/urls';


export const fetchMe = async () => {
  const response = await client.get(myUserUrl);
  return response.data;
};
