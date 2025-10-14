import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../service/AuthService';

export const LOGIN = createAsyncThunk("auth/login", async (loginRequest, { rejectWithValue }) => {
  try {
    return (await AuthService.login(loginRequest)).data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Login failed");
  }
});

export const LOGOUT = createAsyncThunk("auth/logout", async (accountId, { rejectWithValue }) => {
  try {
    await AuthService.logout(accountId);
    return;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Logout failed");
  }
});

export const REFRESH = createAsyncThunk("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    return (await AuthService.refresh()).data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Token refresh failed");
  }
});

export const RESENT = createAsyncThunk("auth/resent", async({email, action}, { rejectWithValue })=>{
  try {
    return (await AuthService.resentOtp(email, action)).data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Resent otp failed") 
  }
})

const initialState = {
  loading: false,
  error: null,
  accessToken: null,
  accountId: null,
  otp: null
};

const setPending = (state) => {
  state.loading = true;
  state.error = null;
};

const setRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: () => initialState,
    setAuth: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.accountId = action.payload.accountId || null;
      state.error = null;
      state.loading = false;
      state.otp = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(LOGIN.pending, setPending)
      .addCase(LOGIN.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.accessToken = action.payload.accessToken;
        state.accountId = action.payload.accountId || null;
      })
      .addCase(LOGIN.rejected, setRejected)

      // Logout
      .addCase(LOGOUT.pending, setPending)
      .addCase(LOGOUT.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.accessToken = null;
        state.accountId = null;
      })
      .addCase(LOGOUT.rejected, setRejected)

      // Refresh Token
      .addCase(REFRESH.pending, setPending)
      .addCase(REFRESH.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.accountId = action.payload.accountId || null;
      })
      .addCase(REFRESH.rejected, setRejected)

      // Resent otp
      .addCase(RESENT.pending, setPending)
      .addCase(RESENT.fulfilled, (state, action) => {
        state.loading = false
        state.otp = action.payload
      })
      .addCase(RESENT.rejected, setRejected)
  },
});

export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectAccountId = (state) => state.auth.accountId;
export const selectIsAuthenticated = (state) => Boolean(state.auth.accessToken);
export const selectAuthInfo = (state) => ({
  accessToken: state.auth.accessToken,
  accountId: state.auth.accountId,
});

export const { clearAuth, setAuth } = AuthSlice.actions;
export default AuthSlice.reducer;
