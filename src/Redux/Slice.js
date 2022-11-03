import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cacheImages, cacheUser} from '../App';

const initialState = {
    error: '',
    pageNumber: 1,
    imageList: [],
    userName: 'me',
    userDetail: {},
};

export const fetchImages = createAsyncThunk(
    `fetchImages`, 
    async (_ , thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const startURL = `https://api.unsplash.com/photos?page=`;
            const pgNumber = String(state.feedData.pageNumber);
            const endURL = `&per_page=10&client_id=wFZqNpZO3hcazvogHpwT5_1_xoqoenqJF63mjI2M-4g`;
            const url = startURL + pgNumber + endURL;

            if (cacheImages.has(url)) {
                return cacheImages[url];
            }

            const response = await fetch(url)
            const result = await response.json()

            if (result["errors"]) {
                return thunkAPI.rejectWithValue(result);
            }

            if (cacheImages.size < 1000) cacheImages.set(url, result);

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
            const url = startURL + userName + endURL;

            if (cacheUser.has(url)) {
                return cacheUser[url];
            }

            const response = await fetch(startURL + userName + endURL)
            const result = await response.json()

            if (result["errors"]) {
                return thunkAPI.rejectWithValue(result);
            }
            
            if (cacheUser.size < 2) cacheUser.set(url, result);
            else {
                const deleteKeys = Array.from(cacheUser.keys()).splice(0, 1);
                for (const key of deleteKeys) cacheUser.delete(key);

                cacheUser.set(url, result);
            }

            console.log(cacheUser)

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
        removeError: (state, arg) => {
            state.error = arg.payload;
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

export const { nextPage, userNameChanged, removeError } = Slice.actions;
export default Slice.reducer;