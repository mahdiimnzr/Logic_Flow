import apiClient from "../interceptor/interceptor.service";

const patchParams = async (pathUrl, params) => {
  const response = await apiClient.patch(pathUrl, params);
  return response;
};
export default patchParams;
