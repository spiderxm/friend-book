import React, {FormEvent, Fragment, useRef, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import { setCookie} from "nookies";

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
    const [error, setError] = useState(null);
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
                setCookie(null, 'access-token', user.tokens.access, {
                    HttpOnly: true
                })
                setCookie(null, 'refresh-token', user.tokens.refresh, {
                    HttpOnly: true
                })
                localStorage.setItem("username", user.username)
                localStorage.setItem("email", user.email)
                localStorage.setItem("image", user.image)
                await router.replace("/");
            } catch (e) {
                setError(e);
            }
        }
    }

    return <Fragment>
        <form onSubmit={SignInHandler}>
            <div>
                <div>
                    <label htmlFor={"email"}>Email </label>
                    <input type={"email"} id={"email"} ref={emailRef}/>
                </div>
                <div>
                    <label htmlFor={"password"}>Password</label>
                    <input type={"password"} id={"password"} ref={passwordRef} minLength={7}/>
                </div>
                {loading ? <span>loading</span> : <button type={"submit"}>Sign In</button>}
                {error ? <span>Errors</span> : null}
                <div>
                    Don't have an account? <Link href={"/signup"}>Signup</Link>
                </div>
            </div>
        </form>
    </Fragment>
}


export default SignInForm;