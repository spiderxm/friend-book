import {GetServerSideProps} from "next";
import {isLoggedIn} from "../../utility/auth"
import {parseCookies} from "nookies";
import classes from "../../styles/Post.module.css"
import {Icon} from "semantic-ui-react";
import {useRef, useState} from "react";
import Comments from "../../components/comments/comments";
import CreateCommentForm from "../../components/comments/create-comment";

const PostDetailScreen: React.FC<any> = (props) => {
    const commentRef = useRef<any>();
    const [comments, setComments] = useState<any>([]);
    const [loadingComments, setLoadingcomments] = useState<boolean>(true);
    return <div>
        <div className={classes.post}>
            <img src={props.post.image} className={classes.image}/>
            <h1 className={classes.caption}>{props.post.caption}</h1>
            <div className={classes.icon}>
                <span className={classes.heart}>
                                    <Icon name={'heart outline'} size={"large"}/>
                </span>
                <span className={classes.comment} onClick={() => {
                    commentRef.current!.focus()
                }}>
                                    <Icon name={'comment alternate outline'} size={"large"}/>
                </span>
            </div>
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
    // cookies['refresh-token'] && cookies['access-token'];
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