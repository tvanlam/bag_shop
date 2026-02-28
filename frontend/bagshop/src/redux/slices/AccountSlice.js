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

export const FETCH_SELECTED_ACCOUNT = createAsyncThunk(
  "account/fetchSelectedAccount",
  async (accountId, { rejectWithValue }) => {
    try {
      return (await AccountService.getById(accountId)).data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Fetch selected account failed"
      );
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
      return (await AccountService.updatePassword(accountId, accountRequest))
        .data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update password failed");
    }
  }
);

export const UPDATE_INFORMATION = createAsyncThunk(
  "account/updateInformation",
  async ({ accountId, accountRequest }, { rejectWithValue }) => {
    try {
      return (await AccountService.updateInformation(accountId, accountRequest))
        .data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Update information failed"
      );
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
  accounts: [],
  account: null,
  selectedAccount: null,

  loadingList: false,
  loadingAccount: false,
  loadingSelected: false,

  errorList: null,
  errorAccount: null,
  errorSelected: null,
};

const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearAccount: (state) => {
      state.account = null;
      state.loadingAccount = false;
      state.errorAccount = null;
    },
    clearSelectedAccount: (state) => {
      state.selectedAccount = null;
      state.loadingSelected = false;
      state.errorSelected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FETCH_ACCOUNTS.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(FETCH_ACCOUNTS.fulfilled, (state, action) => {
        state.loadingList = false;
        state.accounts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(FETCH_ACCOUNTS.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      .addCase(FETCH_ACCOUNT.pending, (state) => {
        state.loadingAccount = true;
        state.errorAccount = null;
      })
      .addCase(FETCH_ACCOUNT.fulfilled, (state, action) => {
        state.loadingAccount = false;
        state.account = action.payload;
      })
      .addCase(FETCH_ACCOUNT.rejected, (state, action) => {
        state.loadingAccount = false;
        state.errorAccount = action.payload;
      })

      .addCase(FETCH_SELECTED_ACCOUNT.pending, (state) => {
        state.loadingSelected = true;
        state.errorSelected = null;
      })
      .addCase(FETCH_SELECTED_ACCOUNT.fulfilled, (state, action) => {
        state.loadingSelected = false;
        state.selectedAccount = action.payload;
      })
      .addCase(FETCH_SELECTED_ACCOUNT.rejected, (state, action) => {
        state.loadingSelected = false;
        state.errorSelected = action.payload;
      })

      .addCase(CREATE_ADMIN.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(CREATE_ADMIN.fulfilled, (state, action) => {
        state.loadingList = false;
        state.accounts.push(action.payload);
      })
      .addCase(CREATE_ADMIN.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      .addCase(REGISTER.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(REGISTER.fulfilled, (state, action) => {
        state.loadingList = false;
        state.accounts.push(action.payload);
      })
      .addCase(REGISTER.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      .addCase(UPDATE_EMAIL.pending, (state) => {
        state.loadingAccount = true;
        state.errorAccount = null;
      })
      .addCase(UPDATE_EMAIL.fulfilled, (state, action) => {
        state.loadingAccount = false;
        state.account = action.payload;
      })
      .addCase(UPDATE_EMAIL.rejected, (state, action) => {
        state.loadingAccount = false;
        state.errorAccount = action.payload;
      })

      .addCase(UPDATE_PASSWORD.pending, (state) => {
        state.loadingAccount = true;
        state.errorAccount = null;
      })
      .addCase(UPDATE_PASSWORD.fulfilled, (state, action) => {
        state.loadingAccount = false;
        state.account = action.payload;
      })
      .addCase(UPDATE_PASSWORD.rejected, (state, action) => {
        state.loadingAccount = false;
        state.errorAccount = action.payload;
      })

      .addCase(UPDATE_INFORMATION.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(UPDATE_INFORMATION.fulfilled, (state, action) => {
        state.loadingList = false;
        state.accounts = state.accounts.map((acc) =>
          acc.id === action.payload.id ? action.payload : acc
        );
        state.account = action.payload;
      })
      .addCase(UPDATE_INFORMATION.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      .addCase(DELETE_ACCOUNT.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(DELETE_ACCOUNT.fulfilled, (state, action) => {
        state.loadingList = false;
        state.accounts = state.accounts.filter(
          (acc) => acc.id !== action.payload.id
        );
      })
      .addCase(DELETE_ACCOUNT.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      });
  },
});

export const selectAccounts = (state) => state.account.accounts;
export const selectAccount = (state) => state.account.account;
export const selectSelectedAccount = (state) => state.account.selectedAccount;

export const selectAccountListLoading = (state) => state.account.loadingList;
export const selectAccountLoading = (state) => state.account.loadingAccount;
export const selectSelectedAccountLoading = (state) =>
  state.account.loadingSelected;

export const selectAccountError = (state) => state.account.errorAccount;
export const selectAccountListError = (state) => state.account.errorList; 
export const selectSelectedAccountError = (state) =>
  state.account.errorSelected;

export const { clearAccount, clearSelectedAccount } = AccountSlice.actions;

export default AccountSlice.reducer;
