import { getStatusHandlers } from "@/app/AppProvider";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 20000,
});

const onSuccess = (response) => response;

const onError = (error) => {
  const handlers = getStatusHandlers();

  if (!error.response) {
    if (!navigator.onLine) {
      handlers?.setOffline();
    } else if (navigator.onLine && error.code === "ERR_NETWORK") {
      handlers?.setServerError();
    }
    return Promise.reject(error);
  }

  if (error.response.status === 429 || error.response.data.error === "banned") {
    handlers?.setBanned();
    return Promise.reject(error);
  }

  if (error.response.status === 403) {
    toast.error("دسترسی به این بخش را ندارید");
    return Promise.reject(error);
  }

  return error.response;
};

apiClient.interceptors.response.use(onSuccess, onError);

apiClient.interceptors.request.use((config) => {
  delete config.headers.Authorization;
  const token = JSON.parse(localStorage.getItem("token") || "null");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
