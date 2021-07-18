import Head from "next/head";
import {Divider, Message} from "semantic-ui-react";
import classes from "./followers.module.css"
import Link from "next/link"
import React from "react";

export interface FollowingDetails {
    follows: Follows;
    created_at: Date;
}

export interface Follows {
    image: string;
    username: string;
}

const FollowingList: React.FC<{ following: FollowingDetails[] }> = (props) => {
    return <div>
        <h1 className={classes.heading}> Following </h1>
        <Head>
            <title>Following</title>
        </Head>
        {
            props.following.map(following => {
                return <div key={following.follows.username} className={classes.follower}>
                    <img
                        src={
                            following
                                .follows.image.startsWith("http") ? following.follows.image : "http://localhost:8000" + following.follows.image
                        }
                        ALIGN={'center'}
                        className={classes.followerUserImage}
                    />
                    <Link href={"/profile/" + following.follows.username}>
                        <h1 className={classes.username}> {following.follows.username} </h1>
                    </Link>
                    <p className={classes.date}>You are following since them {
                        new Date(following.created_at).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })
                    }
                    </p>
                    <Divider/>
                </div>;
            })
        }
        {props.following.length === 0 ?
            <div className={classes.follower}><Message> You don't follow anyone yet</Message></div> : null}
    </div>
}

export default FollowingList;