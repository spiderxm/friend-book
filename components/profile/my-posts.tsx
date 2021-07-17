import Head from 'next/head'
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchMyPosts} from "../../store/my-posts";
import MyPost from "../post/my-post";
import classes from "./my-posts.module.css"
import {Divider, Message} from "semantic-ui-react";
import {RootState} from "../../store";

const MyPosts: React.FC = () => {
    const dispatch = useDispatch();
    const [fetchedPosts, setFetchPosts] = useState(false);
    const posts = useSelector((state: RootState) => state.myPosts.posts);
    const loading= useSelector((state: RootState) => state.myPosts.loading)
    useEffect(() => {
        if (!fetchedPosts && posts.length == 0) {
            dispatch(fetchMyPosts());
            setFetchPosts(true);
        }
    }, [])
    return <Fragment>
        <Head>
            <title>
                My Profile
            </title>
        </Head>
        <Divider horizontal>Posts</Divider>
        {!loading && posts.length === 0 ?  <div className={classes.noPostsPresentInfo}><Message> No Posts Created Yet</Message> </div>: null}
        <div className={classes.row}>
            {posts.map((post: {
                caption: string;
                image: string;
                id: number
            }) => {
                return <MyPost post={post} key={post.id}/>
            })}
        </div>
    </Fragment>
}


export default MyPosts;