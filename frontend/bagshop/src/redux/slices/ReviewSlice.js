import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ReviewService from "../../service/ReviewService";

const initialReview = {
  reviews: [],
  reviewsByProduct: [],
  review: null,
  loading: false,
  error: null,
};

// Thunk: lấy danh sách review
export const FETCH_REVIEWS = createAsyncThunk(
  "review/fetchReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ReviewService.fetchReviews();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lấy danh sách review thất bại"
      );
    }
  }
);

// Thunk: lấy review theo productId
export const FETCH_REVIEW_BY_PRODUCT_ID = createAsyncThunk(
  "review/fetchByProductId",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await ReviewService.fetchReviewByProductId(productId);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lấy review theo product thất bại"
      );
    }
  }
);

const ReviewSlice = createSlice({
  name: "review",
  initialState: initialReview,
  reducers: {
    resetReviewState: (state) => {
      state.reviews = [];
      state.review = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    // fetch All review
      .addCase(FETCH_REVIEWS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_REVIEWS.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(FETCH_REVIEWS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    // fetch Review by product
      .addCase(FETCH_REVIEW_BY_PRODUCT_ID.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_REVIEW_BY_PRODUCT_ID.fulfilled, (state, action)=>{
        state.loading = false
        state.reviewsByProduct = action.payload
      })
      .addCase(FETCH_REVIEW_BY_PRODUCT_ID.rejected, (state, action)=>{
        state.loading = false
        state.error = action.payload
      })
  },
});

export const { resetReviewState } = ReviewSlice.actions;

export const selectReviews = (state) => state.review.reviews;
export const selectReview = (state) => state.review.review;
export const selectLoading = (state) => state.review.loading;
export const selectError = (state) => state.review.error;

export default ReviewSlice.reducer;
