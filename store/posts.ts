import {createSlice} from "@reduxjs/toolkit";

interface State {
    loading: boolean,
    posts: [],
    error: boolean,
    errorMessage: string | null
}

const initialState: State = {
    loading: true,
    posts: [],
    error: false,
    errorMessage: null
}


const postSlice = createSlice({
    name: "posts",
    initialState: initialState,
    reducers: {
        // @ts-ignore

        updatePosts(state, action) {
            return {
                posts: [...state.posts, ...action.payload.posts.results],
                error: false,
                loading: false,
                errorMessage: null
            }
        },
        setError(state) {
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: "There is some error. Please try again later."
            }
        },
    }
})

export const fetchPosts = () => {
    //@ts-ignore
    return async (dispatch) => {
        const response = await fetch("http://localhost:8000/posts/all");
        if (response.ok) {
            const posts = await response.json();
            dispatch(postSlice.actions.updatePosts({posts: posts}))
        } else {
            dispatch(postSlice.actions.setError);
        }
    }
}

export default postSlice;