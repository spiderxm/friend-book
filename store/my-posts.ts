import {createSlice} from "@reduxjs/toolkit";
import {parseCookies} from "nookies";

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


const myPostSlice = createSlice({
    name: "myPosts",
    initialState: initialState,
    reducers: {
        // @ts-ignore
        updatePosts(state, action) {
            return {
                posts: [...action.payload.posts.results],
                error: false,
                loading: false,
                errorMessage: null
            }
        },
        // @ts-ignore
        addPost(state, action) {
            return {
                posts: [...state.posts, action.payload.post],
                error: false,
                loading: false,
                errorMessage: null
            }
        },
        // @ts-ignore
        removePost(state, action) {
            const id = action.payload.id;
            // @ts-ignore
            const posts = state.posts.filter(post => post.id !== id);
            console.log(posts)
            return {
                posts: posts,
                error: state.error,
                loading: state.loading,
                errorMessage: state.errorMessage
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

export const fetchMyPosts = () => {
    //@ts-ignore
    return async (dispatch) => {
        const cookies = parseCookies();
        const accessToken = cookies['access-token'];
        const response = await fetch("http://localhost:8000/posts/",
            {
                headers: {
                    "Authorization": "Bearer " + accessToken,
                    "Content-type": "application/json"
                }
            });
        if (response.ok) {
            const posts = await response.json();
            console.log(posts)
            dispatch(myPostSlice.actions.updatePosts({posts: posts}))
        } else {
            dispatch(myPostSlice.actions.setError);
        }
    }
}

export default myPostSlice;