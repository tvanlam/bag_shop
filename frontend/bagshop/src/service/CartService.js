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
    return axiosClient.post(`cart/add`, {
      accountId: accountId,
      items: cartRequest.items,
    });
  },
  // Tạo giỏ hàng mới
  createCart(cartRequest) {
    return axiosClient.post("cart", cartRequest);
  },
  updateCart(accountId, cartRequest) {
    return axiosClient.put(`cart/update`, {
      accountId: accountId,
      items: cartRequest.items,
    });
  },
  deleteCart(accountId, cartItemId) {
    return axiosClient.delete(`cart/${accountId}/delete/${cartItemId}`);
  },
};

export default CartService;
