import classes from "../SignIn/signinform.module.css";
import {Button, Form, Header, Loader, Message} from "semantic-ui-react";
import React, {FormEvent, Fragment, useRef, useState} from "react";
import Notiflix from "notiflix";

const ResendEmailForm = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<object | null>(null);
    const [successMessage, setSuccess] = useState<null | string>(null);

    const FormSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);
        const email = emailRef.current!.value;
        if (email) {
            const body = JSON.stringify({email: email})
            const response = await fetch("http://localhost:8000/auth/resend-verification-email/",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: body
                });
            if (response.ok) {
                Notiflix.Notify.success('Login Successful', {
                    timeout: 2000,
                    position: "right-bottom"
                });
                setLoading(false);
                setSuccess("You will receive a verification email shortly.")
            } else {
                const error = await response.json();
                setLoading(false);
                setError(error.errors);
                Notiflix.Notify.failure('There is some error', {
                    timeout: 2000,
                    position: "right-bottom"

                })
            }
        }
    }
    return <Fragment>
        <div className={classes.form}>
            <Form onSubmit={FormSubmitHandler}>
                <Header as='h1'>Resend Verification Email</Header>
                <Form.Field>
                    <label htmlFor={"email"}>Email </label>
                    <input type={"email"} id={"email"} ref={emailRef} required/>
                </Form.Field>
                {loading ? <Loader active inline='centered'/> :
                    <Button fluid primary type={"submit"} in>Submit</Button>}

                {error != null && Object.entries(error).length > 0 &&
                Object.entries(error).map(([key, value]) => {
                    return <Message negative key={value[0]}>
                        <Message.Header>{key} </Message.Header>
                        <p>{value[0]}</p>
                    </Message>
                })}
                {successMessage ? <Message positive>
                    <p>{successMessage}</p>
                </Message> : null}
            </Form>
        </div>
    </Fragment>
}
export default ResendEmailForm;