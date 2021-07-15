import {createSlice} from "@reduxjs/toolkit";

export interface AuthState {
    loggedIn: boolean,
    emailId: string | null,
    accessToken: string | null,
    refreshToken: string | null

}

const initialState: AuthState = {
    loggedIn: false,
    emailId: null,
    accessToken: null,
    refreshToken: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
})

export default authSlice;

