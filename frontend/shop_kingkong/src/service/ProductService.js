import axiosClient from "./AxiosConfig";

const ProductService = {
  getAll() {
    return axiosClient.get("product");
  },
  getProductById(productId) {
    return axiosClient.get(`product/${productId}`);
  },
  createProduct(productRequest) {
    return axiosClient.post("product/create", productRequest);
  },
  updateProduct(productId, productRequest) {
    return axiosClient.put("product/update", productRequest, {
      params: { id: productId },
    });
  },
  deleteProduct(productId) {
    return axiosClient.delete(`product/${productId}`);
  },
};

export default ProductService;
