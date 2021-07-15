import Head from 'next/head'
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../store/posts";
import Post from "../components/post/post";

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const [fetchedPosts, setFetchPosts] = useState(false);
    useEffect(() => {
        if (!fetchedPosts) {
            dispatch(fetchPosts());
            setFetchPosts(true);
        }
    }, [])
    const posts = useSelector(state => state.posts.posts);
    return <Fragment>
        <Head>
            <title>
                Feed
            </title>

        </Head>
        <h1>Feed</h1>
        <ul>
            {posts.map((post: {
                user: {
                    image: string;
                    username: string;
                };
                caption: string;
                imageUrl: string;
                id: number
            }) => {
                return <Post post={post}/>
            })}
        </ul>
    </Fragment>
}


export default Home;