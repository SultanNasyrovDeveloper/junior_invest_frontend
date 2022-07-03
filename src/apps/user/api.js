import { client } from 'api';
import { myUserUrl } from 'api/urls';


export const fetchMe = async () => {
  try {
    const response = await client.get(myUserUrl);
    return response.data;
  } catch(error) {
    console.error(error);
  }
};
