import axios from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL: baseURL,
});

const onSuccess = (response) => {
  return response;
};

const onError = (error) => {
  if (error.response.status >= 500) {
    toast.error("خطا از سوی سرور: " + error.response.status);
  }
  return error.response;
};

apiClient.interceptors.response.use(
  (response) => onSuccess(response),
  (error) => onError(error),
);

apiClient.interceptors.request.use((config) => {
  delete config.headers.Authorization;
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
