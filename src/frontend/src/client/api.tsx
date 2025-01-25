"use client";
import { NEDAFLOW_ACCESS_TOKEN } from "@/constants/constants";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { Cookies } from "react-cookie";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
});
// TODO:: come back when having local useAuthStore
export const APIInterceptor = () => {
  const cookies = new Cookies();
  const controller = new AbortController();

  useEffect(() => {
    const RequestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        const accessToken = cookies.get(NEDAFLOW_ACCESS_TOKEN);
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return {
          ...config,
          signal: controller.signal,
        };
      },
      (error) => {
        controller.abort(error.message);
        return Promise.reject(error);
      }
    );
    const ResponseInterceptor = apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        const isAuthenticationError =
          error?.response?.status === 403 || error?.response?.status === 401;

        if (isAuthenticationError) {
          const accessToken = cookies.get(NEDAFLOW_ACCESS_TOKEN);
          if (!accessToken && error?.config?.url?.includes("login")) {
            return Promise.reject(error);
          }
        }
      }
    );
    return () => {
      apiClient.interceptors.request.eject(RequestInterceptor);
      apiClient.interceptors.response.eject(ResponseInterceptor);
    };
  }, []);

  return null;
};

// TODO:: add health check and global state for this
