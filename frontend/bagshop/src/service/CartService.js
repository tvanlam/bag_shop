import axiosClient from "./AxiosConfig";

const CartService = {
  getAll() {
    return axiosClient.get("cart");
  },
  getCartById(cartId) {
    return axiosClient.get(`cart/${cartId}`);
  },
  getCartByAccountId(accountId) {
    return axiosClient.get(`cart/account/${accountId}`);
  },
  // Thêm sản phẩm vào giỏ hàng
  addToCart(accountId, cartRequest) {
    return axiosClient.post(`cart/${accountId}/add`, cartRequest);
  },
  // Tạo giỏ hàng mới
  createCart(cartRequest) {
    return axiosClient.post("cart", cartRequest);
  },
  updateCart(accountId, cartRequest) {
    return axiosClient.put(`cart/${accountId}/update`, cartRequest);
  },
  deleteCart(cartId) {
    return axiosClient.delete(`cart/${cartId}`);
  },
};

export default CartService;
