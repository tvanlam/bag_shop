import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AddressService from "../../service/AddressService";

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

const initialState = {
  addresses: [],
  defaultAddress: null,
  selectedAddress: null,
  loading: false,
  error: null,
};

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

      .addCase(CREATE_ADDRESS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CREATE_ADDRESS.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
        if (action.payload.isDefault) {
          state.defaultAddress = action.payload;
        }
      })
      .addCase(CREATE_ADDRESS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(UPDATE_ADDRESS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UPDATE_ADDRESS.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.map((addr) =>
          addr.id === action.payload.id ? action.payload : addr
        );
        if (action.payload.isDefault) {
          state.defaultAddress = action.payload;
        }
        if (state.selectedAddress?.id === action.payload.id) {
          state.selectedAddress = action.payload;
        }
      })
      .addCase(UPDATE_ADDRESS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(SET_DEFAULT_ADDRESS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SET_DEFAULT_ADDRESS.fulfilled, (state, action) => {
        state.loading = false;
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

      .addCase(DELETE_ADDRESS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DELETE_ADDRESS.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.filter(
          (addr) => addr.id !== action.payload
        );
        if (state.defaultAddress?.id === action.payload) {
          state.defaultAddress = null;
        }
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

export const selectAddresses = (state) => state.address.addresses;
export const selectDefaultAddress = (state) => state.address.defaultAddress;
export const selectSelectedAddress = (state) => state.address.selectedAddress;
export const selectAddressLoading = (state) => state.address.loading;
export const selectAddressError = (state) => state.address.error;

export default AddressSlice.reducer;
