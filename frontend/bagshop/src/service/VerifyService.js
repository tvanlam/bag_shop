import axiosClient from "./AxiosConfig";

const VerifyService = {
  verify(request) {
    return axiosClient.post("verify", request);
  },
};

export default VerifyService;
