import axiosClient from "./AxiosConfig";

const AccountService = {
  getAll() {
    return axiosClient.get("account");
  },
  getById(accountId) {
    return axiosClient.get(`account/${accountId}`);
  },
  register(accountRequest) {
    return axiosClient.post("account/register", accountRequest);
  },
  createAdmin(accountRequest) {
    return axiosClient.post("account/admin", accountRequest);
  },
  updateEmail(accountId, accountRequest) {
    return axiosClient.put(`account/email/${accountId}`, accountRequest);
  },
  updatePassword(accountId, accountRequest) {
    return axiosClient.put(`account/password/${accountId}`, accountRequest);
  },
  updateInformation(accountId, accountRequest) {
    return axiosClient.put(`account/information/${accountId}`, accountRequest);
  },
  delete(accountId) {
    return axiosClient.delete(`account/${accountId}`);
  },
};

export default AccountService;
