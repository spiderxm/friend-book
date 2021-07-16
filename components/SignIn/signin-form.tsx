import React, {FormEvent, Fragment, useRef, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {setCookie} from "nookies";
import {Button, Form, Header, Loader, Message} from "semantic-ui-react";
import classes from "./signinform.module.css";
import Notiflix from "notiflix";

const signInHandler = async (credentials: { email: string, password: string }) => {
    const details = {
        email: credentials.email,
        password: credentials.password
    }
    const response = await fetch("http://localhost:8000/auth/login/",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(details)
        });
    if (response.ok) {
        const details = (await response.json())
        console.log(details.data)
        return details.data;
    } else {
        const error = await response.json();
        throw new Error(error.errors.detail)
    }
}

function SignInForm() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<object | null>(null);
    const router = useRouter()


    async function SignInHandler(event: FormEvent) {
        event.preventDefault()
        setError(null);
        setLoading(true);
        const email = emailRef.current!.value;
        const password = passwordRef.current!.value;

        if (email && password) {
            try {
                const user = await signInHandler({email, password});
                setLoading(false);
                setCookie(null, 'access-token', user.tokens.access, {
                    HttpOnly: true
                })
                setCookie(null, 'refresh-token', user.tokens.refresh, {
                    HttpOnly: true
                })
                localStorage.setItem("username", user.username)
                localStorage.setItem("email", user.email)
                localStorage.setItem("image", user.image)
                localStorage.setItem("user_since", user.created_at)
                Notiflix.Notify.success('Login Successful', {
                    timeout: 2000,
                    position: "right-bottom"
                })
                await router.replace("/");
            } catch (e) {
                setLoading(false);
                setError(e);
                Notiflix.Notify.failure('There is some error', {
                    timeout: 2000,
                    position: "right-bottom"

                })
                console.log(e)
            }
        }
    }

    return <Fragment>
        <div className={classes.form}>
            <Form onSubmit={SignInHandler}>
                <Header as='h1'>Sign In</Header>
                <Form.Field>
                    <label htmlFor={"email"}>Email </label>
                    <input type={"email"} id={"email"} ref={emailRef} required/>
                </Form.Field>
                <Form.Field>
                    <label htmlFor={"password"}>Password</label>
                    <input type={"password"} id={"password"} ref={passwordRef} minLength={7} required/>
                </Form.Field>
                {loading ? <Loader active inline='centered'/> :
                    <Button fluid primary type={"submit"} in>Sign In</Button>}
                {error != null ? <Message negative>
                    <p>{error.toString()}</p>
                </Message> : null
                }
                <Message>
                    Don't have an account? <Link href={"/signup"}>Signup</Link>
                </Message>
            </Form>
        </div>
    </Fragment>
}


export default SignInForm;