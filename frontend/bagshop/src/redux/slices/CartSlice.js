import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CartService from "../../service/CartService";

export const FETCH_CARTS = createAsyncThunk(
  "cart/fetchCarts",
  async (accountId, { rejectWithValue }) => {
    try {
      if (!accountId) {
        return rejectWithValue("Account ID is required");
      }
      return (await CartService.getCartByAccountId(accountId)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch cart failed");
    }
  }
);

export const FETCH_CART = createAsyncThunk(
  "cart/fetchCart",
  async (cartId, { rejectWithValue }) => {
    try {
      return (await CartService.getCartById(cartId)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch cart failed");
    }
  }
);

export const CREATE_CART = createAsyncThunk(
  "cart/createCart",
  async (cartRequest, { rejectWithValue }) => {
    try {
      return await CartService.createCart(cartRequest).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Create cart failed");
    }
  }
);

export const ADD_TO_CART = createAsyncThunk(
  "cart/addToCart",
  async ({ accountId, cartRequest }, { rejectWithValue }) => {
    try {
      return (await CartService.addToCart(accountId, cartRequest)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Add to cart failed");
    }
  }
);

export const UPDATE_CART = createAsyncThunk(
  "cart/updateCart",
  async ({ accountId, cartRequest }, { rejectWithValue }) => {
    try {
      return (await CartService.updateCart(accountId, cartRequest)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update cart failed");
    }
  }
);

export const DELETE_CART = createAsyncThunk(
  "cart/deleteCart",
  async ({ accountId, cartItemId }, { rejectWithValue }) => {
    try {
      const res = await CartService.deleteCart(accountId, cartItemId);
      // If backend returns the deleted item id or the updated cart, prefer res.data
      return res?.data ?? cartItemId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete cart failed");
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  carts: [],
  cart: null,
  totalQuantity: 0,
};

const setPending = (state) => {
  state.loading = true;
  state.error = null;
};

const setRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: () => initialState,
    setTotalQuantity: (state, action) => {
      state.totalQuantity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Carts
      .addCase(FETCH_CARTS.pending, setPending)
      .addCase(FETCH_CARTS.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Backend trả về array CartDto, lấy items từ cart đầu tiên (hoặc tất cả items)
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          // Nếu là array CartDto, lấy items từ cart đầu tiên
          state.carts = action.payload[0].items || [];
          state.cart = action.payload[0];
        } else if (action.payload && action.payload.items) {
          // Nếu là CartDto object
          state.carts = action.payload.items || [];
          state.cart = action.payload;
        } else {
          state.carts = [];
        }
      })
      .addCase(FETCH_CARTS.rejected, setRejected)
      // Fetch Cart
      .addCase(FETCH_CART.pending, setPending)
      .addCase(FETCH_CART.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart = action.payload;
      })
      .addCase(FETCH_CART.rejected, setRejected)
      // Create Cart
      .addCase(CREATE_CART.pending, setPending)
      .addCase(CREATE_CART.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart = action.payload;
      })
      .addCase(CREATE_CART.rejected, setRejected)
      // Add To Cart
      .addCase(ADD_TO_CART.pending, setPending)
      .addCase(ADD_TO_CART.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart = action.payload;
        // Backend trả về CartDto với items array, lưu items vào carts
        state.carts = action.payload.items || [];
      })
      .addCase(ADD_TO_CART.rejected, setRejected)
      // Update Cart
      .addCase(UPDATE_CART.pending, setPending)

      .addCase(UPDATE_CART.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload && action.payload.items) {
          state.carts = action.payload.items || [];
          state.cart = action.payload;
        }
      })
      .addCase(UPDATE_CART.rejected, setRejected)
      // Delete Cart
      .addCase(DELETE_CART.pending, setPending)
      .addCase(DELETE_CART.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // action.payload may be: { id: deletedId } or deletedId or updated cart
        const payload = action.payload;
        let deletedId = null;
        if (payload == null) {
          // fallback to the thunk arg if available
          deletedId = action.meta?.arg?.cartItemId;
        } else if (typeof payload === "object" && payload.id) {
          deletedId = payload.id;
        } else if (typeof payload === "string" || typeof payload === "number") {
          deletedId = payload;
        }

        if (deletedId != null) {
          state.carts = state.carts.filter((item) => item.id !== deletedId);
          if (state.cart && Array.isArray(state.cart.items)) {
            state.cart.items = state.cart.items.filter(
              (item) => item.id !== deletedId
            );
          }
        } else if (payload && payload.items) {
          // If backend returned the updated cart, use its items
          state.carts = payload.items || [];
          state.cart = payload;
        }
      })
      .addCase(DELETE_CART.rejected, setRejected);
  },
});

export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;
export const selectCarts = (state) => state.cart.carts;
export const selectCart = (state) => state.cart.cart;
export const { clearCart, setTotalQuantity } = CartSlice.actions;
export default CartSlice.reducer;
