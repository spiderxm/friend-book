import {createSlice} from "@reduxjs/toolkit";
import {parseCookies} from "nookies";

interface State {
    loading: boolean,
    posts: Post[],
    error: boolean,
    errorMessage: string | null
}

interface Post {
    user: User;
    caption: string;
    image: string;
    created_at: Date;
    likes: string[];
    id: number;
}

interface User {
    image: string;
    username: string;
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
        updatePosts(_state, action) {
            return {
                posts: [...action.payload.posts.results],
                error: false,
                loading: false,
                errorMessage: null
            }
        },
        addPost(state, action) {
            return {
                posts: [action.payload.post, ...state.posts],
                error: false,
                loading: false,
                errorMessage: null
            }
        },
        removePost(state, action) {
            const id = action.payload.id;
            const posts = state.posts.filter(post => post.id !== id);
            console.log(posts)
            return {
                posts: posts,
                error: state.error,
                loading: state.loading,
                errorMessage: state.errorMessage
            }
        },
        clearPosts(_state){
            return initialState
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
            dispatch(myPostSlice.actions.updatePosts({posts: posts}))
        } else {
            dispatch(myPostSlice.actions.setError);
        }
    }
}

export default myPostSlice;