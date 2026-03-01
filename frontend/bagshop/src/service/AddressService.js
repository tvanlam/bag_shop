import axiosClient from "./AxiosConfig";

const AddressService = {
  // Lấy tất cả địa chỉ của một account
  getAddressesByAccountId(accountId) {
    return axiosClient.get(`address/account/${accountId}`);
  },

  // Lấy địa chỉ mặc định của account
  getDefaultAddress(accountId) {
    return axiosClient.get(`address/account/${accountId}/default`);
  },

  // Lấy địa chỉ theo ID
  getAddressById(addressId) {
    return axiosClient.get(`address/${addressId}`);
  },

  // Tạo địa chỉ mới
  createAddress(addressRequest) {
    return axiosClient.post("address/create", addressRequest);
  },

  // Cập nhật địa chỉ
  updateAddress(addressId, addressRequest) {
    return axiosClient.put(`address/${addressId}`, addressRequest);
  },

  // Đặt địa chỉ làm mặc định
  setDefaultAddress(addressId) {
    return axiosClient.put(`address/${addressId}/default`);
  },

  // Xóa địa chỉ
  deleteAddress(addressId) {
    return axiosClient.delete(`address/${addressId}`);
  },
};

export default AddressService;
