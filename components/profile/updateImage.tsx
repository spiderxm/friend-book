import React, {FormEvent, useRef, useState} from "react";
import {Button, Form, Header} from "semantic-ui-react";
import classes from "./updateImage.module.css";
import {parseCookies} from "nookies";
import Notiflix from "notiflix";
import {useRouter} from "next/router";

const UpdateImageForm: React.FC = () => {
    const [image, setImage] = useState<null | File>(null);
    const router = useRouter();
    const imageRef = useRef<File | any>();
    const formSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();
        let body = new FormData(
        );
        // @ts-ignore
        body.append("image", image);
        const cookies = parseCookies()
        const refreshToken: string = cookies['refresh-token']
        const accessToken: string = cookies['access-token']
        if (refreshToken && accessToken) {
            const response = await fetch("http://localhost:8000/auth/user-image/", {
                method: "PUT",
                body: body,
                headers: {
                    "Authorization": "Bearer " + accessToken
                }
            })
            if (response.ok) {
                const data = await response.json()
                localStorage.setItem("image", data.image)
                Notiflix.Notify.success('Profile Image Updated Successfully', {
                    timeout: 2000,
                    position: "right-bottom"
                })
                await router.push("/profile")
            } else {
                Notiflix.Notify.failure('There is some error', {
                    timeout: 2000,
                    position: "right-bottom"
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
            <Header as='h1'>Update Profile Image</Header>
            <Form.Field>
                <Button
                    fluid
                    content="Choose File"
                    labelPosition="left"
                    icon="file"
                    onClick={() => imageRef.current.click()}
                />
                <input
                    ref={imageRef}
                    type="file"
                    hidden
                    onChange={handleChange}
                    required
                    accept="image/*"
                />
            </Form.Field>
            <Button type="submit" fluid primary>Upload</Button>
            {image != null ? <img className={classes.featureImage} src={window.URL.createObjectURL(image)}/> : null}

        </Form>
    </div>
}

export default UpdateImageForm;