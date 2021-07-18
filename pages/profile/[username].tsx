import React, {useEffect, useState} from "react";
import classes from "../../components/profile/info.module.css";
import {GetServerSideProps} from "next";
import {Button, Divider, Message} from "semantic-ui-react";
import MyPost from "../../components/post/my-post";
import {useRouter} from "next/router";
import Head from "next/head";
import UnFollowButton from "../../components/profile/unfollow-button";
import FollowButton from "../../components/profile/follow-button";
import {parseCookies} from "nookies";

interface Props {
    profile: UserProfile
}

interface UserProfile {
    created_at: Date;
    id: number;
    username: string;
    image: string;
    posts: Post[];
    followers_count: number;
    follows_count: number;
}

interface Post {
    caption: string;
    image: string;
    created_at: Date;
    user: number;
    likes: string[];
    id: number;
}


const userProfile: React.FC<Props> = ({profile}) => {
    const [followers, setFollowers] = useState(profile.followers_count);
    const router = useRouter();
    let formattedDate: string | null = null;
    if (profile.created_at) {
        formattedDate = new Date(profile.created_at).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
        })
    }
    const [follows, setFollows] = useState(false);
    const [fetchedFollows, setFetchedFollows] = useState(false);
    const [username, _setUserName] = useState("");
    const fetchCheckUserIsFollowed = async () => {
        const response = await fetch("http://localhost:8000/users/do-you-follow/", {
            method: "POST",
            body: JSON.stringify({"username": profile.username}),
            headers: {
                "Authorization": "Bearer " + parseCookies()['access-token'],
                "Content-type": "application/json"
            }
        })
        if (response.ok) {
            const data = await response.json();
            setFollows(data.follows);
            setFetchedFollows(true);
        }

    }
    useEffect(() => {
        if (username == "") {
            if (typeof window !== 'undefined') {
                if (localStorage.getItem("username") === profile.username) {
                    router.replace("/profile")
                }
            }
        }
        if (!fetchedFollows) {
            fetchCheckUserIsFollowed();
        }
    }, [])
    return <React.Fragment>
        <Head>
            <title>{profile.username} profile</title>
        </Head>
        <div className={classes.profile}>
            <img src={profile.image!} className={classes.image} align={"center"}/>
        </div>
        <div>
            <div className={classes.profileHeader}>
                {profile.username ? <h1>{profile.username}</h1> : null}
                {formattedDate ? <h3>User Since: {formattedDate}</h3> : null}
                <Button size='small' color={"linkedin"}>
                    Following: {profile.follows_count}
                </Button>
                <Button size='small' color={"linkedin"}>
                    Followers: {followers}
                </Button>
            </div>

        </div>
        <div className={classes.profileHeader}>
            {fetchedFollows && follows ?
                <UnFollowButton username={profile.username} setFollows={setFollows} setFollowers={setFollowers}/> : null}
            {fetchedFollows && !follows ? <FollowButton username={profile.username} setFollows={setFollows} setFollowers={setFollowers}/> : null}
        </div>
        <Divider horizontal>Posts</Divider>
        <div className={classes.row}>
            {profile.posts.map((post: {
                caption: string;
                image: string;
                id: number
            }) => {
                return <MyPost post={post} key={post.id}/>
            })}
        </div>
        {profile.posts.length === 0 ?
            <div className={classes.noPostsPresentInfo}><Message> No posts present</Message></div> : null}
    </React.Fragment>
}
export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const username: string = context.query.username as string;
    const response = await fetch("http://localhost:8000/auth/user-profile/" + username, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    if (response.ok) {
        const data = await response.json();
        return {
            props: {
                profile: data.data
            }
        }
    } else {
        return {
            notFound: true
        }
    }

}
export default userProfile;