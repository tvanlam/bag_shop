import axios from "axios";

const CartService = {
  getAll() {
    return axios.get("cart");
  },
  getCartById(productId) {
    return axios.get(`cart/${cartId}`);
  },
  createCart(productRequest) {
    return axios.get(`cart/create/${cartRequest}`);
  },
  updateCart(cartId, cartRequest) {
    return axios.get(`cart/update/${cartId}/${cartRequest}`);
  },
  deleteCart(cartId) {
    return axios.get(`cart/delete/${cartId}`);
  },
};
