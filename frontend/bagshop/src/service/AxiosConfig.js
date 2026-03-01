import axios from "axios";
import { store } from "../redux/store";
import AuthService from "./AuthService";
import { setAuth, clearAuth } from "../redux/slices/AuthSlice";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:8081"
    : "https://bag-shop-hcih.onrender.com");

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// --- QUẢN LÝ REFRESH TOKEN ---
let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(newToken) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

// --- INTERCEPTOR REQUEST ---
axiosClient.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().auth;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// --- INTERCEPTOR RESPONSE ---
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    const originalRequest = config;

    // Nếu 401 và chưa retry
    if (response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang refresh, chờ refresh xong
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await AuthService.refresh();
        const { accessToken: newAccessToken, accountId } = res.data;

        store.dispatch(setAuth({ accessToken: newAccessToken, accountId }));
        onRefreshed(newAccessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        isRefreshing = false;
        store.dispatch(clearAuth());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
