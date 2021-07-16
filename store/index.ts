import {configureStore} from '@reduxjs/toolkit'
import authSlice from "./auth";
import postSlice from "./posts";
import privacyPolicySlice from "./privacy-policy";
import myPostSlice from "./my-posts";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        posts: postSlice.reducer,
        privacyPolicy: privacyPolicySlice.reducer,
        myPosts: myPostSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>