import React, {useEffect, useState} from "react";
import classes from "../../components/profile/info.module.css";
import {GetServerSideProps} from "next";
import {Divider} from "semantic-ui-react";
import MyPost from "../../components/post/my-post";
import {useRouter} from "next/router";
import Head from "next/head";

interface Props {
    profile: UserProfile
}

interface UserProfile {
    created_at: Date;
    id: number;
    username: string;
    image: string;
    posts: Post[];
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
    const router = useRouter();
    let formattedDate: string | null = null;
    if (profile.created_at) {
        formattedDate = new Date(profile.created_at).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
        })
    }
    const [username, _setUserName] = useState("");
    useEffect(() => {
        if (username == "") {
            if (typeof window !== 'undefined') {
                if (localStorage.getItem("username") === profile.username) {
                    router.replace("/profile")
                }
            }
        }
    }, [])
    return <React.Fragment>
        <Head>
            <title>{profile.username} profile</title>
        </Head>
        <div className={classes.profile}>
            <img src={profile.image!} className={classes.image} align={"center"}/>
            <div className={classes.info}>
                {profile.username ? <span className={classes.username}>{profile.username}</span> : null}
                {formattedDate ? <span className={classes.userSince}>User Since: {formattedDate}</span> : null}
            </div>
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