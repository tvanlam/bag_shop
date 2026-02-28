import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryService from "../../service/CategoryService";

export const FETCH_CATEGORIES = createAsyncThunk('category/fetchAll', async(_, {rejectWithValue})=>{
    try {
        return ((await CategoryService.fetchCategories()).data)
    } catch (error) {
        return rejectWithValue(error.response?.data || "fetch Categories failed")
    }
})

export const FETCH_CATEGORY_BY_ID = createAsyncThunk('category/fetchCategoryById', async({categoryId}, {rejectWithValue})=>{
    try{
        return ((await CategoryService.fetchCategoryById(categoryId)).data)
    }catch(error){
        return rejectWithValue(error.response?.data || "fetch category id failed")
    }
})

export const POST_CATEGORY = createAsyncThunk('category/createCategory', async({categoryRequest}, {rejectWithValue})=>{
    try {
        return ((await CategoryService.createCategory(categoryRequest)).data)
    } catch (error) {
        return rejectWithValue(error.response?.data)
    }
})

export const PUT_CATEGORY = createAsyncThunk('category/updateCategory', async({categoryId, categoryRequest}, {rejectWithValue})=>{
    try {
        return ((await CategoryService.updateCategory(categoryId, categoryRequest)).data)
    } catch (error) {
        return rejectWithValue(error.response?.data)
    }
})

const CategoryState = {
    categories: [],
    category: null,
    loading: false,
    error: null,
}

const setPending = (state) => {
    state.loading = true
    state.error = null
}

const setRejected = (state, action) => {
    state.loading = false
    state.error = action.payload
}

const CategorySlice = createSlice({
    name: "category",
    initialState: CategoryState,
    reducers: {
    clearCategoryState: (state) => {
        state.categories = []
        state.category = null
        state.loading = false
        state.error = null
    }
    },
    extraReducers: (builder) => {
        builder
        .addCase(FETCH_CATEGORIES.pending, setPending)
        .addCase(FETCH_CATEGORIES.fulfilled, (state, action)=>{
            state.loading = false
            state.categories = action.payload
        })
        .addCase(FETCH_CATEGORIES.rejected, setRejected)

        .addCase(FETCH_CATEGORY_BY_ID.pending, setPending)
        .addCase(FETCH_CATEGORY_BY_ID.fulfilled, (state, action)=>{
            state.loading = false
            state.category = action.payload
        })

        .addCase(POST_CATEGORY.pending, setPending)
        .addCase(POST_CATEGORY.fulfilled, (state, action)=>{
            state.loading = false
            state.category = action.payload
        })
        .addCase(POST_CATEGORY.rejected, setRejected)

        .addCase(PUT_CATEGORY.pending, setPending)
        .addCase(PUT_CATEGORY.fulfilled, (action, state)=>{
            state.loading = false
            state.category = action.payload
        })
        .addCase(PUT_CATEGORY.rejected, setRejected)
    }
})

export const selectedLoading = (state) => state.category.loading
export const selectedError = (state) => state.category.error
export const selectedCategory = (state) => state.category.category
export const selectedCategories = (state) => state.category.categories
export const { clearCategoryState } = CategorySlice.actions
export default CategorySlice.reducer