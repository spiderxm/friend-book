import React, {Fragment, useRef, useState} from "react";
import Link from "next/link";

function SignInForm() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function SignInHandler() {
        setError(null);
        setLoading(true);
        const email = emailRef.current!.value;
        const password = passwordRef.current!.value;
        console.log({email, password})
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