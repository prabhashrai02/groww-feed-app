import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cacheImages, cacheUser} from '../App';

const initialState = {
    error: '',
    pageNumber: 1,
    imageList: [],
    userName: 'me',
    userDetail: {},
};

let url = '';

export const fetchImages = createAsyncThunk(
    `fetchImages`, 
    async (_ , thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const startURL = `https://api.unsplash.com/photos?page=`;
            const pgNumber = String(state.feedData.pageNumber);
            const endURL = `&per_page=10&client_id=wFZqNpZO3hcazvogHpwT5_1_xoqoenqJF63mjI2M-4g`;
            url = startURL + pgNumber + endURL;

            if (cacheImages.has(url)) {
                return;
            }

            const response = await fetch(url)
            const result = await response.json()

            if (result["errors"]) {
                return thunkAPI.rejectWithValue(result);
            }

            return result;
        }
        catch(error) {
            return thunkAPI.rejectWithValue(error);
        }
})

export const fetchUser = createAsyncThunk(
    `fetchUser`, 
    async (_ , thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const startURL = `https://api.unsplash.com/users/`;
            const userName = String(state.feedData.userName);
            const endURL = `?client_id=V4w_mAMz--_6DNlrFggMb4pq715Si8LRyjqBSImmQoM`;
            url = startURL + userName + endURL;

            if (cacheUser.has(url)) {
                return;
            }

            const response = await fetch(startURL + userName + endURL)
            const result = await response.json()

            if (result["errors"]) {
                return thunkAPI.rejectWithValue(result);
            }

            return result;
        }
        catch(error) {
            return thunkAPI.rejectWithValue("error");
        }
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
        },
        removeError: (state) => {
            state.error = '';
        },
        removeUser: (state) => {
            state.userDetail = {};
        }
    },
    extraReducers: {
        // checks for async fetching of feed Images
        [fetchImages.fulfilled]: (state, action) => {
            
            // cacheImages map is used to cache the feed images and avoid extra API calls
            if (!cacheImages.has(url)) {
                if (cacheImages.size < 1000) cacheImages.set(url, action.payload)
                state.imageList = [...state.imageList, ...action.payload];
            }
        },
        [fetchImages.rejected]: (state, action) => {
            state.error = action.payload;
        },

        // checks for async fetching of Userdetail
        [fetchUser.fulfilled]: (state, action) => {

            // cacheUser map is used to cache the user details and avoid extra API calls
            if (!cacheUser.has(url)) {
                const data = action.payload;
                if (cacheUser.size < 1000) cacheUser.set(url, data);
                else {
                    const deleteKeys = Array.from(cacheUser.keys()).splice(0, 1);
                    for (const key of deleteKeys) cacheUser.delete(key);
    
                    cacheUser.set(url, action.payload);
                }
                state.userDetail = JSON.parse(JSON.stringify(data));
            }
            else {
                state.userDetail = JSON.parse(JSON.stringify(cacheUser.get(url)));
            }
        },
        [fetchUser.rejected]: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const { nextPage, userNameChanged, removeError, removeUser } = Slice.actions;
export default Slice.reducer;