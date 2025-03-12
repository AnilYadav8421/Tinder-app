import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: 'requests',
    initialState: [],
    reducers:{
        addRequest:(state, action) =>{
            // return[...action.payload]
            return action.payload || [];
        },
        removeRequest: (state, action) => {
            return state.filter((request) => request._id !== action.payload);
        },
    }
});

export const {addRequest, removeRequest} = requestSlice.actions;
export default requestSlice.reducer;