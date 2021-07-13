import React, {useRef, useState} from "react";
import {Fragment} from "react";


const ResetPasswordForm: React.FC = () => {
    const oldPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function SignInHandler() {
        setError(null);
        setLoading(true);
        const oldPassword = oldPasswordRef.current!.value;
        const newPassword = newPasswordRef.current!.value;
        console.log({oldPassword: oldPassword, newPassword: newPassword})
    }

    return <Fragment>
        <form onSubmit={SignInHandler}>
            <div>
                <div>
                    <label htmlFor={"old-password"}>Old Password</label>
                    <input type={"password"} id={"old-password"} ref={oldPasswordRef} minLength={7}/>
                </div>
                <div>
                    <label htmlFor={"new-password"}>New Password</label>
                    <input type={"password"} id={"new-password"} ref={newPasswordRef} minLength={7}/>
                </div>
                {loading ? <span>loading</span> : <button>Reset Password</button>}
                {error ? <span>Errors</span> : null}
            </div>
        </form>
    </Fragment>
}

export default ResetPasswordForm