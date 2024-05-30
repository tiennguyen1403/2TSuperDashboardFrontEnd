import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3333",
});

const onAccessTokenExpire = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const headers = { ["Authorization"]: `Bearer ${refreshToken}` };
  const aaa = await axiosInstance.post("/auth/refresh", {}, { headers });
  console.log("aaa :>> ", aaa);
};

const onRequestSuccess = (requestConfig: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) requestConfig.headers["Authorization"] = `Bearer ${accessToken}`;
  return { ...requestConfig };
};

const onRequestFailure = (error: AxiosError) => {
  return Promise.reject(error);
};

const onResponseSuccess = (response: AxiosResponse) => {
  return response;
};

const onResponseFailure = async (error: AxiosError) => {
  console.log("error :>> ", error);
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequestSuccess, onRequestFailure);
axiosInstance.interceptors.response.use(onResponseSuccess, onResponseFailure);

export default axiosInstance;
