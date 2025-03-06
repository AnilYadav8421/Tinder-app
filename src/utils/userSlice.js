import { createSlice } from "@reduxjs/toolkit";

// creating userSlice
const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        removeUser: (state, action) => {
            return null;
        }
    }
})

export const {addUser, removeUser} = userSlice.actions; // exporting slice.

export default userSlice.reducer