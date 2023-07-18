import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import boardReducer from "./slices/boardSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        board: boardReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store