import {Fragment, useRef, useState} from "react";
import Link from "next/link";

function SignupForm(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function signUpHandler() {
        setError(null);
        setLoading(true);
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        if (password !== confirmPassword) {

            setLoading(false);
            return;
        }
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
                <div>
                    <label htmlFor={"confirm-password"}>ConfirmPassword </label>
                    <input type={"password"} id={"confirm-password"} ref={confirmPasswordRef} minLength={7}/>
                </div>
                <button>SignUp</button>
                Already have an account? <Link href={"/signin"}>Signin</Link>
            </div>
        </form>
    </Fragment>
}


export default SignupForm;