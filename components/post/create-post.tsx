import React, {FormEvent, useRef, useState} from "react";
import {Button, Form, Header, Message} from "semantic-ui-react";
import classes from "./create-post.module.css";
import {parseCookies} from "nookies";
import Notiflix from "notiflix";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import myPostSlice, {fetchMyPosts} from "../../store/my-posts";
import {RootState} from "../../store";
import {logoutUser} from "../../utility/auth";

const CreatePostForm: React.FC = () => {
    const [image, setImage] = useState<null | File>(null);
    const router = useRouter();
    const imageRef = useRef<File | any>();
    const captionRef = useRef<String | any>();
    const [errors, setErrors] = useState<object | null>(null);
    const dispatch = useDispatch();
    const fetched: boolean = useSelector<RootState>(state => state.myPosts.fetched)
    const formSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();
        setErrors(null);
        let body = new FormData(

        );
        const caption = captionRef.current!.value
        // @ts-ignore
        body.append("image", image);
        body.append("caption", caption)
        const cookies = parseCookies()
        const refreshToken: string = cookies['refresh-token']
        const accessToken: string = cookies['access-token']
        if (image === null) {
            setErrors({
                "Image": ["Please choose an image"]
            })
            return;
        }
        if (refreshToken && accessToken) {
            const response = await fetch("http://localhost:8000/posts/", {
                method: "POST",
                body: body,
                headers: {
                    "Authorization": "Bearer " + accessToken
                }
            })
            if (response.ok) {
                const post = await response.json();
                Notiflix.Notify.success('Post Created Successfully', {
                    timeout: 1000
                })
                if (fetched) {
                    dispatch(myPostSlice.actions.addPost({post: post}))
                } else {
                    dispatch(fetchMyPosts())
                }
                await router.push("/profile")
            } else {
                if (response.status === 401) {
                    await logoutUser(dispatch, router);
                    return;
                }
                const errors = await response.json()
                setErrors(errors.errors);
                Notiflix.Notify.failure('There is some error. Please try again later', {
                    timeout: 1000
                })
            }
        }

    }
    const handleChange = (event: any) => {
        const file = event.target.files[0];
        setImage(file); // storing file
    }
    return <div>

        <Form onSubmit={formSubmitHandler} encType="multipart/form-data" className={classes.form}>
            <Header as='h1'>Create Post</Header>
            <Form.Field>
                <label>Choose Image</label>
                <Button
                    fluid
                    content="Choose Image"
                    labelPosition="left"
                    icon="file"
                    onClick={() => imageRef.current.click()}
                />
                <input
                    ref={imageRef}
                    type="file"
                    hidden
                    onChange={handleChange}
                    accept="image/*"
                />
                <br/>
                <Form.Field>
                    <label htmlFor={"caption"}>Caption</label>
                    <input type={"text"} id={"caption"} minLength={5} required ref={captionRef}/>
                </Form.Field>
            </Form.Field>
            <Button type="submit" fluid primary>Upload</Button>
            {image != null ? <img className={"map-container " + classes.featureImage}
                                  src={window.URL.createObjectURL(image)}/> : null}
            {errors != null && Object.entries(errors).length > 0 &&
            Object.entries(errors).map(([key, value]) => {
                return <Message negative key={value[0]}>
                    <Message.Header>{key} </Message.Header>
                    <p>{value[0]}</p>
                </Message>
            })}
        </Form>
    </div>
}

export default CreatePostForm;