import {GetServerSideProps} from "next";
import {isLoggedIn} from "../../utility/auth"
import {parseCookies} from "nookies";
import classes from "../../styles/Post.module.css"
import {Icon} from "semantic-ui-react";
import {useEffect, useRef, useState} from "react";
import Comments from "../../components/comments/comments";
import CreateCommentForm from "../../components/comments/create-comment";
import Head from "next/head";
import Notiflix from "notiflix";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import myPostSlice from "../../store/my-posts";
import postSlice from "../../store/posts";

const PostDetailScreen: React.FC<any> = (props) => {
    const [likes, setLikes] = useState<string[]>(props.post.likes)
    const [username, setUserName] = useState("");
    useEffect(() => {
        if (username == "") {
            if (typeof window !== 'undefined') {
                setUserName(localStorage.getItem("username") as string);
            }
        }
    }, [])
    const commentRef = useRef<any>();
    const router = useRouter();
    const dispatch = useDispatch();
    const [comments, setComments] = useState<any>([]);
    const [loadingComments, setLoadingcomments] = useState<boolean>(true);
    const likeHandler = async () => {
        const response = await fetch("http://localhost:8000/posts/like/", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + parseCookies()['access-token'],
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: props.post.id
                })
            },
        )
        if (response.ok) {
            const data = await response.json();
            if (data.like) {
                dispatch(postSlice.actions.updateLike({id: props.post.id, likes: [username as string, ...likes]}))
                setLikes([username as string, ...likes]);
            } else {
                const newLikes = likes.filter(like => like != username)
                dispatch(postSlice.actions.updateLike({id: props.post.id, likes: newLikes}))
                setLikes(newLikes);
            }
        } else {
            Notiflix.Notify.failure("There is some error", {
                timeout: 1000
            })
        }
    }
    const deletePost = async () => {
        Notiflix.Confirm.show('Delete Post',
            'Are you sure you want to delete this post?',
            'Yes',
            'No',
            async function () {
                const response = await fetch(`http://localhost:8000/posts/${props.post.id}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": "Bearer " + parseCookies()['access-token'],
                    },
                })
                if (response.ok) {
                    dispatch(myPostSlice.actions.removePost({id: props.post.id}))
                    await router.replace("/profile")
                    Notiflix.Notify.success("Post Deleted Successfully.", {
                        timeout: 1000,
                        position: "right-bottom"
                    })
                } else {
                    Notiflix.Notify.failure("There is some error.", {
                        timeout: 1000,
                        position: "right-bottom"
                    })
                }
            },
            function () {
                return;
            });
    }
    return <div>
        <Head>
            <title>Post Details</title>
        </Head>
        <div className={classes.post}>
            <img src={props.post.image} className={classes.image}/>
            <h1 className={classes.caption}>{props.post.caption}</h1>
            <div className={classes.icon}>
                {likes.includes(username as string) ?
                    <span className={classes.heartFilled} onClick={likeHandler} key={1}>
                                    <Icon name={'heart'} size={"large"}/>
                </span> : null}
                {!likes.includes(username as string) ? <span className={classes.heart} onClick={likeHandler} key={2}>
                                    <Icon name={'heart outline'} size={"large"}/>
                </span> : null}
                <span className={classes.comment} onClick={() => {
                    commentRef.current!.focus()
                }}><Icon name={'comment alternate outline'}
                         size={"large"}/>
                </span>
                {username != "" && username == props.post.user.username ?
                    <span className={classes.comment} onClick={deletePost}>
                    <Icon name={'delete'} size={"large"}/></span> : null}
            </div>
            {likes.length === 1 && <h3 className={classes.likeMessage}>Liked by {likes[0]}</h3>}
            {likes.length > 1 &&
            <h3 className={classes.likeMessage}>Liked by {likes[0]} and {likes.length - 1} others</h3>}
        </div>
        <CreateCommentForm commentRef={commentRef} postId={props.post.id} comments={comments}
                           setComments={setComments}/>
        <div className={classes.comments}>
            <Comments comments={comments} setComments={setComments} loading={loadingComments}
                      setLoadingComments={setLoadingcomments} postId={props.post.id}/>
        </div>
    </div>
}
export const getServerSideProps: GetServerSideProps = async (context: any) => {
    if (!isLoggedIn(context)) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        }
    }
    const cookies = parseCookies(context);
    const response = await fetch("http://localhost:8000/posts/" + context.query.id, {
        headers: {
            "Authorization": "Bearer " + cookies['access-token'],
            "Content-type": "application/json"
        }
    })
    if (response.ok) {
        return {
            props: {
                post: await response.json()
            }
        }
    } else {
        return {
            notFound: true
        }
    }
}
export default PostDetailScreen