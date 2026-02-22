import axios from "axios";

const axiosRaw = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const AuthService = {
  login(loginRequest) {
    return axiosRaw.post("auth/login", loginRequest);
  },
  logout(accountId) {
    return axiosRaw.post(`auth/logout/${accountId}`);
  },
  refresh() {
    return axiosRaw.post("auth/refresh");
  },
  resentOtp(email, action) {
    return axiosRaw.post(`auth/resent?email=${email}&action=${action}`);
  },
  googleLogin(accessToken) {
    return axiosRaw.post("auth/google", { accessToken });
  },
};

export default AuthService;
