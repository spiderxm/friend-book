import {Button, Form, Loader} from "semantic-ui-react";
import classes from "../../styles/Post.module.css"
import React, {FormEvent, useState} from "react";
import {parseCookies} from "nookies";
import Notiflix from "notiflix";

const CreateCommentForm: React.FC<any> = (props) => {
    const [loading, setLoading] = useState(false);

    async function createCommentHandler(event: FormEvent) {
        event.preventDefault();
        setLoading(true)
        const comment = props.commentRef.current.value
        const accessToken = parseCookies()['access-token'];
        const response = await fetch("http://localhost:8000/posts/comment/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                body: comment,
                post: props.postId
            })
        })
        if (response.ok) {
            const comment = await response.json();
            comment.user = {
                image: "http://localhost:8000" + localStorage.getItem("image"),
                username: localStorage.getItem("username")
            }
            Notiflix.Notify.success("Comment Created Successfully", {
                timeout: 1000
            })
            props.commentRef.current.value = ""
            props.setComments([comment, ...props.comments])
        } else {
            Notiflix.Notify.failure("There was some error. Please try again later.", {
                timeout: 1000
            })
        }
        setLoading(false)
    }

    return <div className={classes.commentBody}>
        <Form onSubmit={createCommentHandler}>
            <Form.Field>
                <label htmlFor={"comment"}>
                    Comment
                </label>
                <input type={"text"} minLength={5} id={"comment"} name={"comment"} ref={props.commentRef} required/>
            </Form.Field>
            {loading ? <Loader active inline={"centered"}/> : <Button fluid primary>Post Comment</Button>
            }
        </Form>
    </div>
}

export default CreateCommentForm;