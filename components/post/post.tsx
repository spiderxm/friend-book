import React from "react";
import {Image} from "semantic-ui-react";
import classes from "./post.module.css";
import {Icon} from "semantic-ui-react";

interface Props {
    post: {
        user: {
            image: string;
            username: string;
        }
        caption: string;
        imageUrl: string;
        id: number
    }
}

const Post: React.FC<Props> = ({post}) => {
    console.log(post)
    return <div className={classes.post}>
        <div>
            <img className={classes.userImage} src={post.user.image} ALIGN={"middle"}/>
            <span className={classes.username}>{post.user.username}</span>
        </div>
        <Image src={post.imageUrl}/>
        <div className={classes.menu}>
            <Icon className={"heart outline"} size='large'/>
            <Icon className={"comments outline"} size='large'/>
            <h1>
                {post.caption}
            </h1>
        </div>
    </div>;
}

export default Post;