import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AccountService from "../../service/AccountService";

export const FETCH_ACCOUNTS = createAsyncThunk(
  "account/fetchAccounts",
  async (_, { rejectWithValue }) => {
    try {
      return (await AccountService.getAll()).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch accounts failed");
    }
  }
);

export const FETCH_ACCOUNT = createAsyncThunk(
  "account/fetchAccount",
  async (accountId, { rejectWithValue }) => {
    try {
      return (await AccountService.getById(accountId)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch account failed");
    }
  }
);

export const REGISTER = createAsyncThunk(
  "account/register",
  async (accountRequest, { rejectWithValue }) => {
    try {
      return (await AccountService.register(accountRequest)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Register failed");
    }
  }
);

export const CREATE_ADMIN = createAsyncThunk(
  "account/createAdmin",
  async (accountRequest, { rejectWithValue }) => {
    try {
      return (await AccountService.createAdmin(accountRequest)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Create admin failed");
    }
  }
);

export const UPDATE_EMAIL = createAsyncThunk(
  "account/updateEmail",
  async ({ accountId, accountRequest }, { rejectWithValue }) => {
    try {
      return (await AccountService.updateEmail(accountId, accountRequest)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update email failed");
    }
  }
);

export const UPDATE_PASSWORD = createAsyncThunk(
  "account/updatePassword",
  async ({ accountId, accountRequest }, { rejectWithValue }) => {
    try {
      return (await AccountService.updatePassword(accountId, accountRequest)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update password failed");
    }
  }
);

export const UPDATE_INFORMATION = createAsyncThunk(
  "account/updateInformation",
  async ({ accountId, accountRequest }, { rejectWithValue }) => {
    try {
      return (await AccountService.updateInformation(accountId, accountRequest)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update information failed");
    }
  }
);

export const DELETE_ACCOUNT = createAsyncThunk(
  "account/deleteAccount",
  async (accountId, { rejectWithValue }) => {
    try {
      return (await AccountService.delete(accountId)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete account failed");
    }
  }
);

const initialState = {
  loadingList: false,
  loadingAccount: false,
  error: null,
  accounts: [],
  account: null,
};

const setPendingList = (state) => {
  state.loadingList = true;
  state.error = null;
};
const setRejectedList = (state, action) => {
  state.loadingList = false;
  state.error = action.payload;
};
const setPendingAccount = (state) => {
  state.loadingAccount = true;
  state.error = null;
};
const setRejectedAccount = (state, action) => {
  state.loadingAccount = false;
  state.error = action.payload;
};

const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearAccount: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Accounts (list)
      .addCase(FETCH_ACCOUNTS.pending, setPendingList)
      .addCase(FETCH_ACCOUNTS.fulfilled, (state, action) => {
        state.loadingList = false;
        state.error = null;
        state.accounts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(FETCH_ACCOUNTS.rejected, setRejectedList)

      // Fetch Account (single)
      .addCase(FETCH_ACCOUNT.pending, setPendingAccount)
      .addCase(FETCH_ACCOUNT.fulfilled, (state, action) => {
        state.loadingAccount = false;
        state.error = null;
        state.account = action.payload;
      })
      .addCase(FETCH_ACCOUNT.rejected, setRejectedAccount)

      // Register (affects list)
      .addCase(REGISTER.pending, setPendingList)
      .addCase(REGISTER.fulfilled, (state, action) => {
        state.loadingList = false;
        state.error = null;
        state.accounts.push(action.payload);
      })
      .addCase(REGISTER.rejected, setRejectedList)

      // Create Admin (affects list)
      .addCase(CREATE_ADMIN.pending, setPendingList)
      .addCase(CREATE_ADMIN.fulfilled, (state, action) => {
        state.loadingList = false;
        state.error = null;
        state.accounts.push(action.payload);
      })
      .addCase(CREATE_ADMIN.rejected, setRejectedList)

      // Update Email (affects single account)
      .addCase(UPDATE_EMAIL.pending, setPendingAccount)
      .addCase(UPDATE_EMAIL.fulfilled, (state, action) => {
        state.loadingAccount = false;
        state.error = null;
        state.account = action.payload;
      })
      .addCase(UPDATE_EMAIL.rejected, setRejectedAccount)

      // Update Password (affects single account)
      .addCase(UPDATE_PASSWORD.pending, setPendingAccount)
      .addCase(UPDATE_PASSWORD.fulfilled, (state, action) => {
        state.loadingAccount = false;
        state.error = null;
        state.account = action.payload;
      })
      .addCase(UPDATE_PASSWORD.rejected, setRejectedAccount)

      // Update Information (both)
      .addCase(UPDATE_INFORMATION.pending, setPendingList)
      .addCase(UPDATE_INFORMATION.fulfilled, (state, action) => {
        state.loadingList = false;
        state.error = null;
        state.accounts = state.accounts.map((a) => (a.id === action.payload.id ? action.payload : a));
        state.account = action.payload;
      })
      .addCase(UPDATE_INFORMATION.rejected, setRejectedList)

      // Delete Account (affects list)
      .addCase(DELETE_ACCOUNT.pending, setPendingList)
      .addCase(DELETE_ACCOUNT.fulfilled, (state, action) => {
        state.loadingList = false;
        state.error = null;
        state.accounts = state.accounts.filter((a) => a.id !== action.payload.id);
      })
      .addCase(DELETE_ACCOUNT.rejected, setRejectedList);
  },
});

export const selectAccountListLoading = (state) => state.account.loadingList;
export const selectAccountLoading = (state) => state.account.loadingAccount;
export const selectAccountError = (state) => state.account.error;
export const selectAccounts = (state) => state.account.accounts;
export const selectAccount = (state) => state.account.account;
export const { clearAccount } = AccountSlice.actions;
export default AccountSlice.reducer;
