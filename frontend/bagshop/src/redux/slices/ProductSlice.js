import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../../service/ProductService";

export const FETCH_PRODUCTS = createAsyncThunk(
  "product/fetchProducts",
  async (
    { pageNumber = 0, pageSize = 10, sortBy = "id", sortDir = "asc" } = {},
    { rejectWithValue },
  ) => {
    try {
      const response = await ProductService.getProductsWithPaging(
        pageNumber,
        pageSize,
        sortBy,
        sortDir,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch products failed");
    }
  },
);

/** Lazy load: tải trang tiếp theo và append vào danh sách (infinite scroll) */
export const FETCH_PRODUCTS_APPEND = createAsyncThunk(
  "product/fetchProductsAppend",
  async (
    { pageNumber = 0, pageSize = 10, sortBy = "id", sortDir = "asc" } = {},
    { rejectWithValue },
  ) => {
    try {
      const response = await ProductService.getProductsWithPaging(
        pageNumber,
        pageSize,
        sortBy,
        sortDir,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch more products failed");
    }
  },
);

export const FETCH_PRODUCT = createAsyncThunk(
  "product/fetchProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await ProductService.getProductById(productId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch product failed");
    }
  },
);

export const FETCH_PRODUCT_BY_CATEGORY = createAsyncThunk(
  "product/fetchProductByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await ProductService.getProductByCategoryId(categoryId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Fetch products by category failed",
      );
    }
  },
);

export const CREATE_PRODUCT = createAsyncThunk(
  "product/createProduct",
  async (productRequest, { rejectWithValue }) => {
    try {
      const response = await ProductService.createProduct(productRequest);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Create product failed");
    }
  },
);

export const CREATE_VARIANT = createAsyncThunk(
  "product/createVariant",
  async ({ productId, productVariantRequest }, { rejectWithValue }) => {
    try {
      const response = await ProductService.createVariant(
        productId,
        productVariantRequest,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Create variant failed");
    }
  },
);

export const UPDATE_PRODUCT = createAsyncThunk(
  "product/updateProduct",
  async ({ productId, productRequest }, { rejectWithValue }) => {
    try {
      const response = await ProductService.updateProduct(
        productId,
        productRequest,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update product failed");
    }
  },
);

export const UPDATE_VARIANT = createAsyncThunk(
  "product/updateVariant",
  async (
    { productId, variantId, productVariantRequest },
    { rejectWithValue },
  ) => {
    try {
      const response = await ProductService.updateVariant(
        productId,
        variantId,
        productVariantRequest,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update variant failed");
    }
  },
);

export const DELETE_PRODUCT = createAsyncThunk(
  "product/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await ProductService.deleteProduct(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete product failed");
    }
  },
);

export const DELETE_VARIANT = createAsyncThunk(
  "product/deleteVariant",
  async (variantId, { rejectWithValue }) => {
    try {
      await ProductService.deleteVariant(variantId);
      return variantId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete variant failed");
    }
  },
);

const initialState = {
  loading: false,
  loadingMore: false,
  error: null,

  products: [],
  product: null,

  byCategory: {},

  pagination: {
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
  },
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProduct: () => initialState,
  },
  extraReducers: (builder) => {
    
    builder
      .addCase(FETCH_PRODUCTS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_PRODUCTS.fulfilled, (state, action) => {
        state.loading = false;
        state.products =
          action.payload.content || action.payload.products || action.payload;

        if (action.payload.number !== undefined) {
          state.pagination = {
            currentPage: action.payload.number ?? 0,
            totalPages: action.payload.totalPages ?? 0,
            totalElements: action.payload.totalElements ?? 0,
            pageSize: action.payload.size ?? 10,
          };
        }
      })
      .addCase(FETCH_PRODUCTS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     
      .addCase(FETCH_PRODUCTS_APPEND.pending, (state) => {
        state.loadingMore = true;
        state.error = null;
      })
      .addCase(FETCH_PRODUCTS_APPEND.fulfilled, (state, action) => {
        state.loadingMore = false;
        const newContent = action.payload.content || action.payload.products || action.payload;
        const list = Array.isArray(newContent) ? newContent : [];
        state.products = [...(state.products || []), ...list];
        if (action.payload.number !== undefined) {
          state.pagination = {
            currentPage: action.payload.number ?? 0,
            totalPages: action.payload.totalPages ?? 0,
            totalElements: action.payload.totalElements ?? 0,
            pageSize: action.payload.size ?? 10,
          };
        }
      })
      .addCase(FETCH_PRODUCTS_APPEND.rejected, (state, action) => {
        state.loadingMore = false;
        state.error = action.payload;
      })

      
      .addCase(FETCH_PRODUCT.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_PRODUCT.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(FETCH_PRODUCT.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     
      .addCase(FETCH_PRODUCT_BY_CATEGORY.pending, (state, action) => {
        const categoryId = action.meta.arg;
        if (!state.byCategory[categoryId]) {
          state.byCategory[categoryId] = { products: [], loading: true };
        } else {
          state.byCategory[categoryId].loading = true;
        }
      })
      .addCase(FETCH_PRODUCT_BY_CATEGORY.fulfilled, (state, action) => {
        const categoryId = action.meta.arg;
        const products = Array.isArray(action.payload) ? action.payload : [];

        state.byCategory[categoryId] = {
          products,
          loading: false,
          error: null,
        };
      })
      .addCase(FETCH_PRODUCT_BY_CATEGORY.rejected, (state, action) => {
        const categoryId = action.meta.arg;
        state.byCategory[categoryId] = {
          products: [],
          loading: false,
          error: action.payload,
        };
      })

     
      .addCase(CREATE_PRODUCT.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      
      .addCase(UPDATE_PRODUCT.fulfilled, (state, action) => {
        state.products = state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p,
        );
        state.product = action.payload;
      })

      
      .addCase(DELETE_PRODUCT.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.products = state.products.filter((p) => p.id !== deletedId);
      })
      
      .addCase(CREATE_VARIANT.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

     
      .addCase(UPDATE_VARIANT.fulfilled, (state, action) => {
        state.products = state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p,
        );
        state.product = action.payload;
      })

      // === DELETE_VARIANT ===
      .addCase(DELETE_VARIANT.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.products = state.products.filter((p) => p.id !== deletedId);
      });
  },
});


export const selectProductLoading = (state) => state.product.loading;
export const selectProductLoadingMore = (state) => state.product.loadingMore;
export const selectProductError = (state) => state.product.error;
export const selectProducts = (state) => state.product.products;
export const selectProduct = (state) => state.product.product;
export const selectProductPagination = (state) => state.product.pagination;

/** Còn trang tiếp theo để lazy load không */
export const selectHasMoreProducts = (state) => {
  const p = state.product.pagination;
  return p.totalPages > 0 && p.currentPage + 1 < p.totalPages;
};

export const selectProductsByCategory = (state) => state.product.byCategory;

export const { clearProduct } = ProductSlice.actions;

export default ProductSlice.reducer;
