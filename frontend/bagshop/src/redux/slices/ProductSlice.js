import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../../service/ProductService";

export const FETCH_PRODUCTS = createAsyncThunk(
  "product/fetchProducts",
  async (
    { pageNumber = 0, pageSize = 10, sortBy = "id", sortDir = "asc" } = {},
    { rejectWithValue }
  ) => {
    try {
      return (
        await ProductService.getProductsWithPaging(
          pageNumber,
          pageSize,
          sortBy,
          sortDir
        )
      ).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch products failed");
    }
  }
);

export const FETCH_PRODUCT = createAsyncThunk(
  "product/fetchProduct",
  async (productId, { rejectWithValue }) => {
    try {
      return (await ProductService.getProductById(productId)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch product failed");
    }
  }
);

export const FETCH_PRODUCT_BY_CATEGORY = createAsyncThunk(
  "product/fetchProductByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      return (await ProductService.getProductByCategoryId(categoryId)).data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "fetch product by category failed"
      );
    }
  }
);

export const CREATE_PRODUCT = createAsyncThunk(
  "product/createProduct",
  async (productRequest, { rejectWithValue }) => {
    try {
      return (await ProductService.createProduct(productRequest)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Create product failed");
    }
  }
);

export const UPDATE_PRODUCT = createAsyncThunk(
  "product/updateProduct",
  async ({ productId, productRequest }, { rejectWithValue }) => {
    try {
      return (await ProductService.updateProduct(productId, productRequest))
        .data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update product failed");
    }
  }
);

export const DELETE_PRODUCT = createAsyncThunk(
  "product/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await ProductService.deleteProduct(productId);
      return;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete product failed");
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  pagination: {
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 5,
  },
};

const setPending = (state) => {
  state.loading = true;
  state.error = null;
};

const setRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProduct: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(FETCH_PRODUCTS.pending, setPending)
      .addCase(FETCH_PRODUCTS.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Handle both Spring Page response and custom response
        state.products =
          action.payload.content || action.payload.products || action.payload;
        // Update pagination info if available (Spring Page format)
        if (
          action.payload.number !== undefined ||
          action.payload.currentPage !== undefined
        ) {
          state.pagination = {
            currentPage:
              action.payload.number ?? action.payload.currentPage ?? 0,
            totalPages: action.payload.totalPages ?? 0,
            totalElements: action.payload.totalElements ?? 0,
            pageSize: action.payload.size ?? action.payload.pageSize ?? 10,
          };
        }
      })
      .addCase(FETCH_PRODUCTS.rejected, setRejected)
      // Fetch Product
      .addCase(FETCH_PRODUCT.pending, setPending)
      .addCase(FETCH_PRODUCT.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.product = action.payload;
      })
      .addCase(FETCH_PRODUCT.rejected, setRejected)
      // Fetcj product by category
      .addCase(FETCH_PRODUCT_BY_CATEGORY.pending, setPending)
      .addCase(FETCH_PRODUCT_BY_CATEGORY.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(FETCH_PRODUCT_BY_CATEGORY.rejected, setRejected)
      // Create Product
      .addCase(CREATE_PRODUCT.pending, setPending)
      .addCase(CREATE_PRODUCT.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products.push(action.payload);
      })
      .addCase(CREATE_PRODUCT.rejected, setRejected)
      // Update Product
      .addCase(UPDATE_PRODUCT.pending, setPending)
      .addCase(UPDATE_PRODUCT.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = state.products.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        });
        state.product = action.payload;
      })
      .addCase(UPDATE_PRODUCT.rejected, setRejected)
      // Delete Product
      .addCase(DELETE_PRODUCT.pending, setPending)
      .addCase(DELETE_PRODUCT.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      })
      .addCase(DELETE_PRODUCT.rejected, setRejected);
  },
});

export const selectProductLoading = (state) => state.product.loading;
export const selectProductError = (state) => state.product.error;
export const selectProducts = (state) => state.product.products;
export const selectProduct = (state) => state.product.product;
export const selectProductsByCategory = (state) => state.product.products;
export const selectProductPagination = (state) => state.product.pagination;
export const { clearProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
