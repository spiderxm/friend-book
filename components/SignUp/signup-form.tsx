import React, {Fragment, useRef, useState} from "react";
import Link from "next/link";

function SignupForm() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function signUpHandler() {
        setError(null);
        setLoading(true);
        const email = emailRef.current!.value;
        const password = passwordRef.current!.value;
        const confirmPassword = confirmPasswordRef.current!.value;
        if (password !== confirmPassword) {
            setLoading(false);
            return;
        }
        console.log(email)
    }

    return <Fragment>
        <form onSubmit={signUpHandler}>
            <div>
                <div>
                    <label htmlFor={"email"}>Email </label>
                    <input type={"email"} id={"email"} ref={emailRef}/>
                </div>
                <div>
                    <label htmlFor={"password"}>Password</label>
                    <input type={"password"} id={"password"} ref={passwordRef} minLength={7}/>
                </div>
                <div>
                    <label htmlFor={"confirm-password"}>ConfirmPassword </label>
                    <input type={"password"} id={"confirm-password"} ref={confirmPasswordRef} minLength={7}/>
                </div>
                {loading ? <span>loading</span> : <button type={"submit"}>Sign Up</button>}
                {error ? <span>Errors</span> : null}
                <div>
                    Already have an account? <Link href={"/signin"}>SignIn</Link>
                </div>
            </div>
        </form>
    </Fragment>
}


export default SignupForm;