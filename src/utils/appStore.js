import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'

// create redux store
const appStore = configureStore({
    reducer : {
        user: userReducer,
    },
})

export default appStore