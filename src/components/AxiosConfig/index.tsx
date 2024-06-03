import React from "react";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import useAuthStore from "../../store/useAuth";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface ErrorResponse {
  statusCode: number;
  message: string;
}

type Props = {
  children: React.ReactElement;
};

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3333",
  headers: { "Content-Type": "application/json" },
});

const AxiosConfig: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken, signOut }: any = useAuthStore();

  const onAccessTokenExpire = async (failedRequest: AxiosRequestConfig) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) throw new Error("No refresh token available");

      const response: AxiosResponse<TokenResponse> = await axios.post(
        "http://localhost:3333/auth/refresh",
        { refreshToken }
      );

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      setAccessToken(accessToken);
      setRefreshToken(newRefreshToken);

      axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;

      if (failedRequest.headers) failedRequest.headers.Authorization = `Bearer ${accessToken}`;

      return Promise.resolve();
    } catch (error) {
      signOut();
      navigate("/sign-in");
      notification.info({ message: "Token was expired!", description: "Please sign in again." });
      return Promise.reject(error);
    }
  };

  const onRequestSuccess = (requestConfig: any) /* config type error */ => {
    const accessToken = localStorage.getItem("accessToken");
    const requestHeaders = { ...requestConfig.headers, Authorization: `Bearer ${accessToken}` };
    if (accessToken) requestConfig.headers = requestHeaders;
    return requestConfig;
  };

  const onRequestFailure = (error: AxiosError) => {
    return Promise.reject(error);
  };

  const onResponseSuccess = (response: AxiosResponse) => {
    return response;
  };

  const onResponseFailure = async (error: AxiosError<ErrorResponse>) => {
    const originalRequest: any = error.config; /* config type error */

    if (error.response?.status === 401) {
      try {
        await onAccessTokenExpire(originalRequest);
        return axiosInstance(originalRequest);
      } catch (error) {
        signOut();
        navigate("/sign-in");
        notification.info({ message: "Token was expired!", description: "Please sign in again." });
      }
    }
    notification.error({ message: error.response?.data.message });
    return Promise.reject(error);
  };

  axiosInstance.interceptors.request.use(onRequestSuccess, onRequestFailure);
  axiosInstance.interceptors.response.use(onResponseSuccess, onResponseFailure);

  return <>{props.children}</>;
};

export default AxiosConfig;
