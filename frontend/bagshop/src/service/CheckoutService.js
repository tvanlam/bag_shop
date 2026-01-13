import axiosClient from "./AxiosConfig";

const CheckoutService = {
  //ORDER
  getOrders() {
    return axiosClient.get("order");
  },
  getOrderById(orderId) {
    return axiosClient.get(`order/${orderId}`);
  },
  createOrder({ accountId, voucherId, paymentMethod }) {
    return axiosClient.post(`order/create`, {
      accountId: accountId,
      voucherId: voucherId,
      paymentMethod: paymentMethod,
    });
  },
  updateOrder(accountId, voucherId) {
    return axiosClient.put(`order/update`, {
      accountId: accountId,
      voucherId: voucherId,
    });
  },
  deleteOrder(orderId) {
    return axiosClient.delete(`order/${orderId}`);
  },

  // VOUCHER
  getVouchers() {
    return axiosClient.get("voucher");
  },

  getVoucherById(voucherId) {
    return axiosClient.get(`voucher/${voucherId}`);
  },

  createVoucher(VoucherRequest) {
    return axiosClient.create(`voucher/create`, { VoucherRequest });
  },
  updateVoucher(voucherId, VoucherRequest) {
    return axiosClient.put(`voucher/update/${voucherId}`, { VoucherRequest });
  },
  deleteVoucher(voucherId) {
    return axiosClient.delete(`voucher/${voucherId}`);
  },
};

export default CheckoutService;
