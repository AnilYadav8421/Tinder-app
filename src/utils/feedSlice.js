import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: [],
    reducers: {
        addfeed: (state, action) => {
            return action.payload || [];
        },
        removeFeed: (state, action) => {
            return [];
        }
    }
})

export const { addfeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer