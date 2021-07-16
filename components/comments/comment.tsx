import React from "react";
import {Comment} from "semantic-ui-react";
import classes from "./comment.module.css"

interface CommentProps {
    body: string,
    "created_at": string
    id: number
    user: {
        image: string,
        username: string
    }
}

const CommentCard: React.FC<CommentProps> = (props) => {
    const formattedDate: string | null = new Date(props["created_at"]).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    })

    return <Comment>
        {/*<img src={props.user.image} width={50} height={50} style={{borderRadius:"50%"}}/>*/}
        <Comment.Avatar as='a' src={props.user.image} className={classes.commentUserImage}/>

        <Comment.Content>
            <Comment.Author as='a'>{props.user.username}</Comment.Author>
            <Comment.Metadata>
                <div>{formattedDate}</div>
            </Comment.Metadata>
            <Comment.Text>{props.body}</Comment.Text>
        </Comment.Content>
    </Comment>

}

export default CommentCard;