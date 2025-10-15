import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../../service/ProductService";

export const FETCH_PRODUCTS = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      return (await ProductService.getAll()).data;
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
        state.products = action.payload;
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
export const { clearProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
