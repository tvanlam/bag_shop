import axiosClient from "./AxiosConfig";

const ProductService = {
  getAll() {
    return axiosClient.get("product");
  },
  getProductsWithPaging(pageNumber, pageSize, sortBy, sortDir) {
    return axiosClient.get(
      `product/getAllProductsWithPaging/${pageNumber}/${pageSize}/${sortBy}/${sortDir}`,
    );
  },
  getProductById(productId) {
    return axiosClient.get(`product/${productId}`);
  },
  getProductByCategoryId(categoryId) {
    return axiosClient.get(`product/category/${categoryId}`);
  },
  createProduct(productRequest) {
    return axiosClient.post("product/create", productRequest);
  },

  createVariant(productId, productVariantRequest) {
    return axiosClient.post(
      `product/${productId}/variants`,
      productVariantRequest,
    );
  },
  updateProduct(productId, productRequest) {
    return axiosClient.put(`product/update/${productId}`, productRequest);
  },

  updateVariant(productId, variantId, productVariantRequest) {
    return axiosClient.put(
      `product/${productId}/variants/${variantId}`,
      productVariantRequest,
    );
  },
  deleteProduct(productId) {
    return axiosClient.delete(`product/${productId}`);
  },
  deleteVariant(variantId) {
    return axiosClient.delete(`product/variants/${variantId}`);
  },
};

export default ProductService;
