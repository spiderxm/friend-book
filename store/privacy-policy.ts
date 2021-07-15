import {createSlice} from "@reduxjs/toolkit";

interface State {
    loading: boolean,
    privacyPolicy: string | null,
    error: boolean,
    errorMessage: string | null

}

const initialState: State = {
    loading: true,
    privacyPolicy: null,
    error: false,
    errorMessage: null
}

const privacyPolicySlice = createSlice({
    name: "privacy-policy",
    reducers: {
        // @ts-ignore
        updatePrivacyPolicy(state, action) {
            return {
                ...state,
                privacyPolicy: action.payload.privacyPolicy,
                loading: false,
                error: false,
                errorMessage: null
            }
        },
        setError(state) {
            return {
                ...state,
                privacyPolicy: null,
                loading: false,
                error: true,
                errorMessage: "There is some error. Please try again later."
            }
        }
    },
    initialState: initialState
});

export const fetchPolicy = () => {
    //@ts-ignore
    return async (dispatch) => {
        const policy: string | null = localStorage.getItem("privacy_policy")
        if (policy != null) {
            dispatch(privacyPolicySlice.actions.updatePrivacyPolicy({privacyPolicy: policy}))
        } else {
            const response = await fetch("http://localhost:8000/info/privacy-policy");
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("privacy_policy", data.privacy_policy)
                dispatch(privacyPolicySlice.actions.updatePrivacyPolicy({privacyPolicy: data.privacy_policy}))
            } else {
                dispatch(privacyPolicySlice.actions.setError);
            }
        }
    }
}

export default privacyPolicySlice;