import {Fragment, useRef, useState} from "react";
import Link from "next/link";

function SignInForm(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function SignInHandler() {
        setError(null);
        setLoading(true);
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
    }

    return <Fragment>
        <form>
            <div>
                <div>
                    <label htmlFor={"email"}>Email </label>
                    <input type={"email"} id={"email"} ref={emailRef}/>
                </div>
                <div>
                    <label htmlFor={"password"}>Password</label>
                    <input type={"password"} id={"password"} ref={passwordRef} minLength={7}/>
                </div>
                <button>SignIn</button>
                Don't have an account? <Link href={"/signup"}>Signup</Link>
            </div>
        </form>
    </Fragment>
}


export default SignInForm;