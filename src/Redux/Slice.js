import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: '',
    pageNumber: 0,
    imageList: [],
    userName: 'me',
    userDetail: {},
};

export const fetchImages = createAsyncThunk(
    `fetchImages`, 
    async (_ , thunkAPI) => {
        const state = thunkAPI.getState();
        const startURL = `https://api.unsplash.com/photos?page=`;
        const pgNumber = String(state.feedData.pageNumber);
        const endURL = `&per_page=10&client_id=wFZqNpZO3hcazvogHpwT5_1_xoqoenqJF63mjI2M-4g`;
        
        const response = await fetch(startURL + pgNumber + endURL)
        const result = await response.json()
        return result;
})

export const fetchUser = createAsyncThunk(
    `fetchUser`, 
    async (_ , thunkAPI) => {
        const state = thunkAPI.getState();
        const startURL = `https://api.unsplash.com/users/`;
        const userName = String(state.feedData.userName);
        const endURL = `?client_id=V4w_mAMz--_6DNlrFggMb4pq715Si8LRyjqBSImmQoM`;
        
        const response = await fetch(startURL + userName + endURL)
        const result = await response.json()
        return result;
})

export const Slice = createSlice({
    name: "feedData",
    initialState,
    reducers: {
        nextPage: (state) => {
            state.pageNumber += 1;
        },
        userNameChanged: (state, arg) => {
            state.userName = arg.payload;
        }
    },
    extraReducers: {
        [fetchImages.fulfilled]: (state, action) => {
            state.imageList = [...state.imageList, ...action.payload];
        },
        [fetchImages.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.userDetail = JSON.parse(JSON.stringify(action.payload));
        },
        [fetchUser.rejected]: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const { nextPage, userNameChanged } = Slice.actions;
export default Slice.reducer;