import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import feedSlice from "./feedSlice";
import connectionReducer from '../utils/connectionsSlice'
import requestReducer from './requestSlice'

// create redux store
const appStore = configureStore({
    reducer : {
        user: userReducer,
        feed: feedSlice,
        connections: connectionReducer,
        requests: requestReducer,
    },
})

export default appStore