import Head from 'next/head'
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../store/posts";
import Post from "../components/post/post";

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const [fetchedPosts, setFetchPosts] = useState(false);
    const posts = useSelector(state => state.posts.posts);

    useEffect(() => {
        if (!fetchedPosts && posts.length == 0) {
            dispatch(fetchPosts());
            setFetchPosts(true);
        }
    }, [])
    return <Fragment>
        <Head>
            <title>
                Feed
            </title>
        </Head>
        <ul>
            {posts.map((post: {
                user: {
                    image: string;
                    username: string;
                };
                caption: string;
                image: string;
                id: number,
                likes: string[]
            }) => {
                return <Post post={post}/>
            })}
        </ul>
    </Fragment>
}


export default Home;