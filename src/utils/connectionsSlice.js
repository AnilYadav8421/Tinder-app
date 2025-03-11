import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: 'connections',
    initialState: [],
    reducers: {
        addConnections: (state, action) => {
            // action.payload,
            // removeConnections:() => null,
            // const validConnections = action.payload.filter(conn => conn !== null); // Remove nulls
            // return [...state, ...validConnections];
            return action.payload;
        }
    }
});

export const { addConnections, removeConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;