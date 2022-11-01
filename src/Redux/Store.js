import { configureStore } from '@reduxjs/toolkit';
import feedData from "./Slice";

export const Store = configureStore({
    reducer: {
        feedData: feedData,
    },
});