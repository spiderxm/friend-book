import React, {FormEvent, Fragment, useRef, useState} from "react";
import Link from "next/link";
import {Button, Form, Header, Loader, Message} from "semantic-ui-react";
import classes from "./signup-form.module.css"
import Notiflix from "notiflix";

function SignupForm() {
    const emailRef = useRef<HTMLInputElement>(null);
    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const [successMessage, setSuccess] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | object>(null);

    async function signUpHandler(event: FormEvent) {
        event.preventDefault()
        setError(null);
        setSuccess(null)
        setLoading(true);
        const email = emailRef.current!.value;
        const username = userNameRef.current!.value;
        const password = passwordRef.current!.value;
        const confirmPassword = confirmPasswordRef.current!.value;
        if (password === confirmPassword) {
            const body = JSON.stringify({
                email: email,
                password: password,
                username: username
            })
            const response = await fetch("http://localhost:8000/auth/register/", {
                method: "POST",
                body: body,
                headers: {
                    "Content-type": "application/json"
                }
            })
            if (response.ok) {
                setSuccess("Account Created Successfully. Please verify your email and sign in")
                setLoading(false);
                emailRef.current!.value = "";
                userNameRef.current!.value = "";
                passwordRef.current!.value = "";
                confirmPasswordRef.current!.value = "";
                Notiflix.Notify.success('Account created successfully', {
                    timeout: 2000,
                    position:"right-bottom"

                })
            } else {
                const errorData = await response.json()
                setError(errorData.errors);
                Notiflix.Notify.failure('There is some error', {
                    timeout: 2000,
                    position:"right-bottom"
                })
                setLoading(false);
            }

        } else {
            setError({"Password": ["Password and Confirm Password Should match"]})
            setLoading(false);
        }
    }

    return <Fragment>
        <Form onSubmit={signUpHandler} className={classes.form}>
            <Header as='h1'>Sign Up</Header>

            <Form.Field>
                <label htmlFor={"email"}>Email </label>
                <input type={"email"} id={"email"} ref={emailRef} required={true}/>
            </Form.Field>
            <Form.Field>
                <label htmlFor={"username"}>UserName </label>
                <input type={"text"} id={"username"} ref={userNameRef} minLength={5} required={true}/>
            </Form.Field>
            <Form.Field>
                <label htmlFor={"password"}>Password</label>
                <input type={"password"} id={"password"} ref={passwordRef} minLength={7} required={true}/>
            </Form.Field>
            <Form.Field>
                <label htmlFor={"confirm-password"}>ConfirmPassword </label>
                <input type={"password"} id={"confirm-password"} ref={confirmPasswordRef} minLength={7}
                       required={true}/>
            </Form.Field>
            {loading ? <Loader active inline='centered'/> : <Button primary fluid type={"submit"}>Sign Up</Button>}
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
            <Message>
                Already have an account? <Link href={"/signin"}>SignIn</Link>
            </Message>
            <Message>
               Didn't receive verification email yet? <Link href={"/resend-verification-email"}>Get One</Link>
            </Message>
        </Form>
    </Fragment>
}


export default SignupForm;
