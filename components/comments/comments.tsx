import React, {Dispatch, useEffect, useState} from "react";
import {parseCookies} from "nookies";
import {Loader, Comment, Message, Divider} from "semantic-ui-react";
import CommentCard from "./comment";
import Notiflix from "notiflix";

interface Comment {
    body: string,
    "created_at": string
    id: number
    user: {
        image: string,
        username: string
    }
}

interface CommentProps {
    comments: Comment[],
    loading: boolean,
    setLoadingComments: Dispatch<any>,
    setComments: Dispatch<any>,
    postId: number
}

const Comments: React.FC<CommentProps> = (props) => {
    const [fetchedComments, setFetchedComments] = useState(false);
    const cookies = parseCookies();

    async function fetchComments() {
        const response = await fetch(`http://localhost:8000/posts/${props.postId}/comments/`, {
            headers: {
                "Authorization": "Bearer " + cookies['access-token']
            }
        });
        if (response.ok) {
            const comments = await response.json()
            props.setComments(comments);
            props.setLoadingComments(false);
        } else {
            Notiflix.Notify.failure("There is some error", {
                timeout: 1000
            })
        }
    }

    useEffect(() => {
        if (!fetchedComments) {
            setFetchedComments(true);
            fetchComments();
        }
    }, []);
    return <div>
        <h1 style={{textAlign: "center"}}>Comments</h1>
        {props.loading ? <Loader active inline={"centered"}/> : null}
        {!props.loading && props.comments.length > 0 ? <Comment.Group size={"large"}><Divider/>{props.comments.map(comment => {
            return <CommentCard key={comment.id} body={comment.body} created_at={comment["created_at"]} id={comment.id}
                                user={comment.user}/>
        })}</Comment.Group> : null}
        {!props.loading && props.comments.length === 0 ? <Message>
            No Comments Present
        </Message> : null}
    </div>;
}
export default Comments;