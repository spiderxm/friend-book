import {createSlice} from "@reduxjs/toolkit";

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


const postSlice = createSlice({
    name: "posts",
    initialState: initialState,
    reducers: {
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
        clearPosts(_state) {
            return initialState
        },
        updateLike(state, action) {
            const likes = action.payload.likes;
            const id = action.payload.id;
            const updatedPosts = state.posts.map(post => {
                if (id === post.id) {
                    return {
                        ...post,
                        likes: likes
                    }
                }
                return post;
            })
            return {
                posts: updatedPosts,
                error: false,
                loading: false,
                errorMessage: null
            }
        }
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