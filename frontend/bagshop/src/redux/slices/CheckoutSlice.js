import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Import service khi bạn có API cho checkout
// import CheckoutService from "../../service/CheckoutService";

// ==================== ASYNC THUNKS ====================

// Thunk: Lấy thông tin địa chỉ giao hàng
export const FETCH_SHIPPING_ADDRESSES = createAsyncThunk(
  "checkout/fetchShippingAddresses",
  async (accountId, { rejectWithValue }) => {
    try {
      // return (await CheckoutService.getShippingAddresses(accountId)).data;
      // Tạm thời return mock data
      return [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Fetch shipping addresses failed"
      );
    }
  }
);

// Thunk: Thêm địa chỉ giao hàng mới
export const ADD_SHIPPING_ADDRESS = createAsyncThunk(
  "checkout/addShippingAddress",
  async ({ accountId, addressData }, { rejectWithValue }) => {
    try {
      // return (await CheckoutService.addShippingAddress(accountId, addressData)).data;
      return addressData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Add shipping address failed"
      );
    }
  }
);

// Thunk: Tạo đơn hàng
export const CREATE_ORDER = createAsyncThunk(
  "checkout/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      // return (await CheckoutService.createOrder(orderData)).data;
      return orderData;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Create order failed");
    }
  }
);

// ==================== INITIAL STATE ====================

const initialState = {
  // Địa chỉ giao hàng
  shippingAddresses: [],
  selectedAddress: null,

  // Thông tin đơn hàng
  orderInfo: {
    shippingMethod: null,
    paymentMethod: null,
    note: "",
  },

  // Trạng thái
  loading: false,
  error: null,

  // Đơn hàng đã tạo
  createdOrder: null,
};

// ==================== HELPER FUNCTIONS ====================

const setPending = (state) => {
  state.loading = true;
  state.error = null;
};

const setRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

// ==================== SLICE ====================

const CheckoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // Clear checkout state
    clearCheckoutState: () => initialState,

    // Set địa chỉ được chọn
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },

    // Set phương thức giao hàng
    setShippingMethod: (state, action) => {
      state.orderInfo.shippingMethod = action.payload;
    },

    // Set phương thức thanh toán
    setPaymentMethod: (state, action) => {
      state.orderInfo.paymentMethod = action.payload;
    },

    // Set ghi chú
    setNote: (state, action) => {
      state.orderInfo.note = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // === FETCH_SHIPPING_ADDRESSES ===
      .addCase(FETCH_SHIPPING_ADDRESSES.pending, setPending)
      .addCase(FETCH_SHIPPING_ADDRESSES.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.shippingAddresses = action.payload;
      })
      .addCase(FETCH_SHIPPING_ADDRESSES.rejected, setRejected)

      // === ADD_SHIPPING_ADDRESS ===
      .addCase(ADD_SHIPPING_ADDRESS.pending, setPending)
      .addCase(ADD_SHIPPING_ADDRESS.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.shippingAddresses.push(action.payload);
        state.selectedAddress = action.payload;
      })
      .addCase(ADD_SHIPPING_ADDRESS.rejected, setRejected)

      // === CREATE_ORDER ===
      .addCase(CREATE_ORDER.pending, setPending)
      .addCase(CREATE_ORDER.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.createdOrder = action.payload;
      })
      .addCase(CREATE_ORDER.rejected, setRejected);
  },
});

// ==================== SELECTORS ====================

export const selectShippingAddresses = (state) =>
  state.checkout.shippingAddresses;
export const selectSelectedAddress = (state) => state.checkout.selectedAddress;
export const selectOrderInfo = (state) => state.checkout.orderInfo;
export const selectCheckoutLoading = (state) => state.checkout.loading;
export const selectCheckoutError = (state) => state.checkout.error;
export const selectCreatedOrder = (state) => state.checkout.createdOrder;

// ==================== EXPORTS ====================

export const {
  clearCheckoutState,
  setSelectedAddress,
  setShippingMethod,
  setPaymentMethod,
  setNote,
  clearError,
} = CheckoutSlice.actions;

export default CheckoutSlice.reducer;
