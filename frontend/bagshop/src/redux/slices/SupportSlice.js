import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import VerifyService from "../../service/VerifyService";

export const VERIFY = createAsyncThunk('support/verify', async(request, {rejectWithValue})=>{
    try {
        return (await VerifyService.verify(request)).data
    } catch (error) {
        return rejectWithValue(error.data?.message || "Xảy ra lỗi không xác định trong quá trình xác thực")
    }
})


const initialState = {
    error: false,
    loading: false,
    response: null,
    success: false
}

const setPending = (state) => {
  state.loading = true;
  state.error = null;
};

const setRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const SupportSlice = createSlice({
    name: "support",
    initialState,
    reducers: {
        clearSupportSlice: () => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(VERIFY.pending, setPending)
        .addCase(VERIFY.fulfilled, (state, action) => {
            state.loading = false,
            state.error = null,
            state.success = action.payload
        })
        .addCase(VERIFY.rejected, setRejected)
    }
})

export const { clearSupportSlice } = SupportSlice.actions
export default SupportSlice.reducer