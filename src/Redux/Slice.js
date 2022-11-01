import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    pageNumber: 0,
    imageList: [],
};

export const fetchImages = createAsyncThunk(
    `fetchImages`, 
    async (_ , thunkAPI) => {
        const state = thunkAPI.getState();
        console.log(state.feedData.pageNumber)
        const startURL = `https://api.unsplash.com/photos?page=`;
        const pgNumber = String(state.feedData.pageNumber);
        const endURL = `&per_page=5&client_id=wFZqNpZO3hcazvogHpwT5_1_xoqoenqJF63mjI2M-4g`;
        
        const response = await fetch(startURL + pgNumber + endURL)
        const result = await response.json()
        return result;
})

export const Slice = createSlice({
    name: "feedData",
    initialState,
    reducers: {
        nextPage: (state) => {
            state.pageNumber += 1;
        }
    },
    extraReducers: {
        [fetchImages.fulfilled]: (state, action) => {
            state.imageList = [...state.imageList, ...action.payload]
        }
    }
});

export const { nextPage } = Slice.actions;
export default Slice.reducer;