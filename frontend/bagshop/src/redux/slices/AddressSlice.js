import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AddressService from "../../service/AddressService";

// Thunk: Lấy tất cả địa chỉ của account
export const FETCH_ADDRESSES = createAsyncThunk(
  "address/fetchAddresses",
  async (accountId, { rejectWithValue }) => {
    try {
      return (await AddressService.getAddressesByAccountId(accountId)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch addresses failed");
    }
  }
);

// Thunk: Lấy địa chỉ mặc định
export const FETCH_DEFAULT_ADDRESS = createAsyncThunk(
  "address/fetchDefaultAddress",
  async (accountId, { rejectWithValue }) => {
    try {
      return (await AddressService.getDefaultAddress(accountId)).data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Fetch default address failed"
      );
    }
  }
);

// Thunk: Lấy địa chỉ theo ID
export const FETCH_ADDRESS_BY_ID = createAsyncThunk(
  "address/fetchAddressById",
  async (addressId, { rejectWithValue }) => {
    try {
      return (await AddressService.getAddressById(addressId)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch address failed");
    }
  }
);

// Thunk: Tạo địa chỉ mới
export const CREATE_ADDRESS = createAsyncThunk(
  "address/createAddress",
  async (addressRequest, { rejectWithValue }) => {
    try {
      return (await AddressService.createAddress(addressRequest)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Create address failed");
    }
  }
);

// Thunk: Cập nhật địa chỉ
export const UPDATE_ADDRESS = createAsyncThunk(
  "address/updateAddress",
  async ({ addressId, addressRequest }, { rejectWithValue }) => {
    try {
      return (await AddressService.updateAddress(addressId, addressRequest))
        .data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update address failed");
    }
  }
);

// Thunk: Đặt địa chỉ làm mặc định
export const SET_DEFAULT_ADDRESS = createAsyncThunk(
  "address/setDefaultAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      return (await AddressService.setDefaultAddress(addressId)).data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Set default address failed"
      );
    }
  }
);

// Thunk: Xóa địa chỉ
export const DELETE_ADDRESS = createAsyncThunk(
  "address/deleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      await AddressService.deleteAddress(addressId);
      return addressId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete address failed");
    }
  }
);

// Initial state
const initialState = {
  addresses: [],
  defaultAddress: null,
  selectedAddress: null,
  loading: false,
  error: null,
};

// Slice
const AddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    clearSelectedAddress: (state) => {
      state.selectedAddress = null;
    },
    clearAddresses: (state) => {
      state.addresses = [];
      state.defaultAddress = null;
      state.selectedAddress = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch addresses
      .addCase(FETCH_ADDRESSES.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_ADDRESSES.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(FETCH_ADDRESSES.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch default address
      .addCase(FETCH_DEFAULT_ADDRESS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_DEFAULT_ADDRESS.fulfilled, (state, action) => {
        state.loading = false;
        state.defaultAddress = action.payload;
      })
      .addCase(FETCH_DEFAULT_ADDRESS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch address by ID
      .addCase(FETCH_ADDRESS_BY_ID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_ADDRESS_BY_ID.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAddress = action.payload;
      })
      .addCase(FETCH_ADDRESS_BY_ID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create address
      .addCase(CREATE_ADDRESS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CREATE_ADDRESS.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
        // Nếu là địa chỉ mặc định, cập nhật defaultAddress
        if (action.payload.isDefault) {
          state.defaultAddress = action.payload;
        }
      })
      .addCase(CREATE_ADDRESS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update address
      .addCase(UPDATE_ADDRESS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UPDATE_ADDRESS.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.map((addr) =>
          addr.id === action.payload.id ? action.payload : addr
        );
        // Cập nhật defaultAddress nếu cần
        if (action.payload.isDefault) {
          state.defaultAddress = action.payload;
        }
        // Cập nhật selectedAddress nếu đang được chọn
        if (state.selectedAddress?.id === action.payload.id) {
          state.selectedAddress = action.payload;
        }
      })
      .addCase(UPDATE_ADDRESS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Set default address
      .addCase(SET_DEFAULT_ADDRESS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SET_DEFAULT_ADDRESS.fulfilled, (state, action) => {
        state.loading = false;
        // Cập nhật tất cả địa chỉ: bỏ isDefault của các địa chỉ khác
        state.addresses = state.addresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === action.payload.id,
        }));
        state.defaultAddress = action.payload;
      })
      .addCase(SET_DEFAULT_ADDRESS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete address
      .addCase(DELETE_ADDRESS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DELETE_ADDRESS.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.filter(
          (addr) => addr.id !== action.payload
        );
        // Nếu xóa địa chỉ mặc định, clear defaultAddress
        if (state.defaultAddress?.id === action.payload) {
          state.defaultAddress = null;
        }
        // Nếu xóa địa chỉ đang được chọn, clear selectedAddress
        if (state.selectedAddress?.id === action.payload) {
          state.selectedAddress = null;
        }
      })
      .addCase(DELETE_ADDRESS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedAddress, clearSelectedAddress, clearAddresses } =
  AddressSlice.actions;

// Selectors
export const selectAddresses = (state) => state.address.addresses;
export const selectDefaultAddress = (state) => state.address.defaultAddress;
export const selectSelectedAddress = (state) => state.address.selectedAddress;
export const selectAddressLoading = (state) => state.address.loading;
export const selectAddressError = (state) => state.address.error;

export default AddressSlice.reducer;
