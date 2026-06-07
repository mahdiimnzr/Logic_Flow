import apiClient from "../interceptor/interceptor.service";

const deleteParams = async (pathUrl, params) => {
  const response = await apiClient.delete(pathUrl, { data: params });
  return response;
};

export default deleteParams;
