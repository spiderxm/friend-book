import React from "react";
import classes from "./post.module.css";
import {Icon} from "semantic-ui-react";

interface Props {
    post: {
        user: {
            image: string;
            username: string;
        }
        caption: string;
        image: string;
        id: number
    }
}

const Post: React.FC<Props> = ({post}) => {
    return <div className={classes.post}>
        <div>
            <img className={classes.userImage} src={post.user.image} ALIGN={"middle"}/>
            <span className={classes.username}>{post.user.username}</span>
        </div>
        <img src={post.image} />
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