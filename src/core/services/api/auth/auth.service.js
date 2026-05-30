import apiClient from "../../interceptor/interceptor.service";
export const postLogin = async (value) => {
  const result = await apiClient.post(`Sign/Login`, value);
  return result;
};
export const loginVerifyCode = async (value) => {
  const response = await apiClient.post(
    `/Sign/LoginTelegram/${value.verifyCode}/${value.phoneOrGmail}`,
  );
  return response;
};
