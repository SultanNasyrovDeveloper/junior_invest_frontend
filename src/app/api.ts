import { getMyUserUrl } from "urls";
import { apiClient } from "./services";

export const fetchMe = async () => {
  const response = await apiClient.get(getMyUserUrl);
  return response.data;
};
