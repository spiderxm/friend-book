import React, {FormEvent, Fragment, useRef, useState} from "react";
import Link from "next/link";

function SignupForm() {
    const emailRef = useRef<HTMLInputElement>(null);
    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const [success, setSuccess] = useState<null | string>(null);
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
            console.log(body)
            const response = await fetch("http://localhost:8000/auth/register/", {
                method: "POST",
                body: body,
                headers: {
                    "Content-type": "application/json"
                }
            })
            if (response.ok) {
                setSuccess("Account Created Successfully. Please verify your email and sign in")
                emailRef.current!.value = "";
                userNameRef.current!.value = "";
                passwordRef.current!.value = "";
                confirmPasswordRef.current!.value = "";
            } else {
                const errorData = await response.json()
                setError(errorData.errors)
            }
            setLoading(false);

        } else {
            setError({"Password": ["Password and Confirm Password Should match"]})
            setLoading(false);
        }
    }


    return <Fragment>
        <form onSubmit={signUpHandler}>
            <div>
                <div>
                    <label htmlFor={"email"}>Email </label>
                    <input type={"email"} id={"email"} ref={emailRef} required={true}/>
                </div>
                <div>
                    <label htmlFor={"username"}>UserName </label>
                    <input type={"string"} id={"username"} ref={userNameRef} minLength={5} required={true}/>
                </div>
                <div>
                    <label htmlFor={"password"}>Password</label>
                    <input type={"password"} id={"password"} ref={passwordRef} minLength={7} required={true}/>
                </div>
                <div>
                    <label htmlFor={"confirm-password"}>ConfirmPassword </label>
                    <input type={"password"} id={"confirm-password"} ref={confirmPasswordRef} minLength={7}
                           required={true}/>
                </div>
                {loading ? <span>loading</span> : <button type={"submit"}>Sign Up</button>}
                {error != null && Object.entries(error).length > 0 &&
                Object.entries(error).map(([key, value]) => {
                    return <div key={value[0]}>{key} : {value[0]}</div>;
                })}
                {success != null ? <div>{success}</div> : null}
                <div>
                    Already have an account? <Link href={"/signin"}>SignIn</Link>
                </div>
            </div>
        </form>
    </Fragment>
}


export default SignupForm;