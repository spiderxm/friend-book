import Head from "next/head";
import {Divider, Message} from "semantic-ui-react";
import classes from "./followers.module.css"
import Link from "next/link"
import React from "react";

export interface FollowerDetails {
    follower: Follower;
    created_at: Date;
}

export interface Follower {
    image: string;
    username: string;
}

const FollowersList: React.FC<{ followers: FollowerDetails[] }> = (props) => {
    return <div>
        <h1 className={classes.heading}> Followers </h1>
        <Head>
            <title>Followers</title>
        </Head>
        {
            props.followers.map(follower => {
                return <div key={follower.follower.username} className={classes.follower}>
                    <img
                        src={
                            follower
                                .follower.image.startsWith("http") ? follower.follower.image : "http://localhost:8000" + follower.follower.image
                        }
                        ALIGN={'center'}
                        className={classes.followerUserImage}
                    />
                    <Link href={"/profile/" + follower.follower.username}>
                        <h1 className={classes.username}> {follower.follower.username} </h1>
                    </Link>
                    <p className={classes.date}>Following you since {
                        new Date(follower.created_at).toLocaleDateString("en-US", {
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
        {props.followers.length === 0 ?
            <div className={classes.follower}><Message> No one follows you yet</Message></div> : null}
    </div>
}

export default FollowersList;