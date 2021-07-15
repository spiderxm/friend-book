import { configureStore } from '@reduxjs/toolkit'
import authSlice from "./auth";



export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>