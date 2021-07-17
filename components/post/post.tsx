import React, {useEffect, useState} from "react";
import classes from "./post.module.css";
import {Icon} from "semantic-ui-react";
import {parseCookies} from "nookies";
import Notiflix from "notiflix";
import {isLoggedIn} from "../../utility/auth";

interface Props {
    post: {
        user: {
            image: string;
            username: string;
        }
        caption: string;
        image: string;
        id: number,
        likes: string[]
    }
}

const Post: React.FC<Props> = ({post}) => {
    const loggedIn = isLoggedIn(null);
    const [likes, setLikes] = useState<string[]>(post.likes);
    const [username, setUserName] = useState("");
    useEffect(() => {
        if (username == "") {
            if (typeof window !== 'undefined') {
                if (localStorage.getItem("username")) {
                    setUserName(localStorage.getItem("username") as string);
                }
            }
        }
    }, [])
    const likeHandler = async () => {
        const response = await fetch("http://localhost:8000/posts/like/", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + parseCookies()['access-token'],
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: post.id
                })
            },
        )
        if (response.ok) {
            const data = await response.json();
            if (data.like) {
                setLikes([username as string, ...likes]);
            } else {
                const newLikes = likes.filter(like => like != username)
                setLikes(newLikes);
            }
        } else {
            Notiflix.Notify.failure("There is some error", {
                timeout: 1000
            })
        }
    }
    const notLoggedInMessageHandler = () => {
        Notiflix.Notify.warning("You are not Signed In", {
            timeout: 1000
        })
    }
    return <div className={classes.post}>
        <div>
            <img className={classes.userImage} src={post.user.image} ALIGN={"middle"}/>
            <span className={classes.username}>{post.user.username}</span>
        </div>
        <img src={post.image}/>
        <div className={classes.menu}>
            {likes.includes(username as string) ?
                <span className={classes.heartFilled} onClick={loggedIn != "" ? likeHandler : () => {
                    notLoggedInMessageHandler()
                }} key={1}>
                                    <Icon name={'heart'} size={"large"}/>
                </span> : null}
            {!likes.includes(username as string) ?
                <span className={classes.heart} onClick={loggedIn ? likeHandler : () => {
                    notLoggedInMessageHandler()
                }} key={2}>
                                    <Icon name={'heart outline'} size={"large"}/>
                </span> : null}
            <span onClick={!loggedIn ? notLoggedInMessageHandler : () => {
            }}>
                            <Icon className={"comments outline"} size='large'/>
            </span>
            <h1>
                {post.caption}
            </h1>
        </div>
    </div>;
}

export default Post;