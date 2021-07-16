import React, {FormEvent, useRef, useState} from "react";
import {Fragment} from "react";
import classes from "./reset-password.module.css"
import {Button, Form, Header, Loader, Message} from "semantic-ui-react";
import {parseCookies} from "nookies";
import Notiflix from "notiflix";

const ResetPasswordForm: React.FC = () => {
    const oldPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<object | null>(null);
    const [successMessage, setSuccess] = useState<null | string>(null);

    async function ResetPasswordHandler(event: FormEvent) {
        event.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);
        const oldPassword = oldPasswordRef.current!.value;
        const newPassword = newPasswordRef.current!.value;
        if (oldPassword == newPassword) {
            setLoading(false);
            setError({
                "New Password": ["New Password can't be same as old password"]
            })
            oldPasswordRef.current!.value = ""
            newPasswordRef.current!.value = ""
        } else {
            const cookies = parseCookies()
            // const refreshToken: string = cookies['refresh-token']
            const accessToken: string = cookies['access-token']
            const response = await fetch("http://localhost:8000/auth/reset-password/", {
                method: "PUT",
                body: JSON.stringify({oldPassword, newPassword}),
                headers: {
                    "Authorization": "Bearer " + accessToken,
                    "Content-type": "application/json"
                }
            });
            if (response.ok) {
                const data = await response.json()
                const successMessage = data.data.message
                setSuccess(successMessage);
                Notiflix.Notify.success(successMessage, {
                    timeout: 1000,
                    position:"right-bottom"
                })
                oldPasswordRef.current!.value = ""
                newPasswordRef.current!.value = ""
            }else{
                const errorData = await response.json()
                setError(errorData.errors);
                Notiflix.Notify.failure("There is some error", {
                    timeout: 1000,
                    position:"right-bottom"
                })
            }
            setLoading(false);
        }
    }

    return <Fragment>
        <Form className={classes.form} onSubmit={ResetPasswordHandler}>
            <Header as='h1'>Reset Password</Header>
            <Form.Field>
                <label htmlFor={"old-password"}>Old Password</label>
                <input type={"password"} id={"old-password"} ref={oldPasswordRef} minLength={7} required/>
            </Form.Field>
            <Form.Field>
                <label htmlFor={"new-password"}>New Password</label>
                <input type={"password"} id={"new-password"} ref={newPasswordRef} minLength={7} required/>
            </Form.Field>
            {loading ? <Loader active inline='centered'/> :
                <Button primary fluid type={"submit"}>Reset Password</Button>}
            {successMessage ? <Message positive>
                <p>{successMessage}</p>
            </Message> : null}
            {error != null && Object.entries(error).length > 0 &&
            Object.entries(error).map(([key, value]) => {
                return <Message negative key={value[0]}>
                    <Message.Header>{key} </Message.Header>
                    <p>{value[0]}</p>
                </Message>
            })}
        </Form>
    </Fragment>
}

export default ResetPasswordForm