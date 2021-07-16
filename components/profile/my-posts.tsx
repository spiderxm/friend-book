import Head from 'next/head'
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchMyPosts} from "../../store/my-posts";
import MyPost from "../post/my-post";
import {Grid} from "semantic-ui-react";

const MyPosts: React.FC = () => {
    const dispatch = useDispatch();
    const [fetchedPosts, setFetchPosts] = useState(false);
    const posts = useSelector(state => state.myPosts.posts);
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

        <Grid>
            {posts.map((post: {
                caption: string;
                image: string;
                id: number
            }) => {
                return <Grid.Column computer={4} mobile={12} tablet={9}>
                    <MyPost post={post}/>
                </Grid.Column>
            })}
        </Grid>
    </Fragment>
}


export default MyPosts;