import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AccountService from '../../service/AccountService';

export const FETCH_ACCOUNTS = createAsyncThunk("account/fetchAccounts", async (_, { rejectWithValue }) => {
    try {
        return (await AccountService.getAll()).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Fetch accounts failed");
    }
}
);

export const FETCH_ACCOUNT = createAsyncThunk("account/fetchAccount", async (accountId, { rejectWithValue }) => {
    try {
        return (await AccountService.getById(accountId)).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Fetch account failed");
    }
}
);

export const REGISTER = createAsyncThunk("account/register", async (accountRequest, { rejectWithValue }) => {
    try {
        return (await AccountService.register(accountRequest)).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Register failed");
    }
}
);

export const CREATE_ADMIN = createAsyncThunk("account/createAdmin", async (accountRequest, { rejectWithValue }) => {
    try {
        return (await AccountService.createAdmin(accountRequest)).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Create admin failed");
    }
}
);

export const UPDATE_EMAIL = createAsyncThunk("account/updateEmail", async ({ accountId, accountRequest }, { rejectWithValue }) => {
    try {
        return (await AccountService.updateEmail(accountId, accountRequest)).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Update email failed");
    }
}
);

export const UPDATE_PASSWORD = createAsyncThunk("account/updatePassword", async ({ accountId, accountRequest }, { rejectWithValue }) => {
    try {
        return (await AccountService.updatePassword(accountId, accountRequest)).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Update password failed");
    }
}
);

export const UPDATE_INFORMATION = createAsyncThunk("account/updateInformation", async ({ accountId, accountRequest }, { rejectWithValue }) => {
    try {
        return (await AccountService.updateInformation(accountId, accountRequest)).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Update information failed");
    }
}
);

export const DELETE_ACCOUNT = createAsyncThunk("account/deleteAccount", async (accountId, { rejectWithValue }) => {
    try {
        return (await AccountService.delete(accountId)).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Delete account failed");
    }
}
);

const initialState = {
    loading: false,
    error: null,
    accounts: [],
    account: null,
};

const setPending = (state) => {
    state.loading = true;
    state.error = null;
};

const setRejected = (state, action) => {
    state.loading = false;
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
            // Fetch Accounts
            .addCase(FETCH_ACCOUNTS.pending, setPending)
            .addCase(FETCH_ACCOUNTS.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.accounts = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(FETCH_ACCOUNTS.rejected, setRejected)

            // Fetch Account
            .addCase(FETCH_ACCOUNT.pending, setPending)
            .addCase(FETCH_ACCOUNT.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.account = action.payload;
            })
            .addCase(FETCH_ACCOUNT.rejected, setRejected)

            // Register
            .addCase(REGISTER.pending, setPending)
            .addCase(REGISTER.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.accounts.push(action.payload);
            })
            .addCase(REGISTER.rejected, setRejected)

            // Create Admin
            .addCase(CREATE_ADMIN.pending, setPending)
            .addCase(CREATE_ADMIN.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.accounts.push(action.payload);
            })
            .addCase(CREATE_ADMIN.rejected, setRejected)

            // Update Email
            .addCase(UPDATE_EMAIL.pending, setPending)
            .addCase(UPDATE_EMAIL.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.account = action.payload;
            })
            .addCase(UPDATE_EMAIL.rejected, setRejected)

            // Update Password
            .addCase(UPDATE_PASSWORD.pending, setPending)

            .addCase(UPDATE_PASSWORD.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.account = action.payload;
            })
            .addCase(UPDATE_PASSWORD.rejected, setRejected)

            // Update Information
            .addCase(UPDATE_INFORMATION.pending, setPending)
            .addCase(UPDATE_INFORMATION.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                state.accounts = state.accounts.map((account) => {
                    if (account.id === action.payload.id) {
                        return action.payload;
                    }
                    return account;
                });

                state.account = action.payload;
            })
            .addCase(UPDATE_INFORMATION.rejected, setRejected)

            // Delete Account
            .addCase(DELETE_ACCOUNT.pending, setPending)
            .addCase(DELETE_ACCOUNT.fulfilled, (state, action) => {

                state.loading = false;
                state.error = null;
                state.accounts = state.accounts.filter((account) => account.id !== action.payload.id);
            })
            .addCase(DELETE_ACCOUNT.rejected, setRejected);
    },
}
);

export const selectAccountLoading = (state) => state.account.loading;
export const selectAccountError = (state) => state.account.error;
export const selectAccounts = (state) => state.account.accounts;
export const selectAccount = (state) => state.account.account;
export const { clearAccount } = AccountSlice.actions;
export default AccountSlice.reducer;
