import React from "react";
import classes from "./my-post.module.css";
import Link from "next/link";

interface Props {
    post: {
        caption: string;
        image: string;
        id: number
    }
}

const MyPost: React.FC<Props> = ({post}) => {
    return <Link href={"/post/" + post.id.toString()}>
        <div className={classes.post}>
            <img src={post.image}/>
        </div>
    </Link>
}

export default MyPost;