import React, {useEffect, useState} from "react";
import {Button, Icon} from "semantic-ui-react";
import Link from "next/link"
import {destroyCookie, parseCookies} from "nookies";
import {useRouter} from "next/router";

const Navbar: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const cookies = parseCookies();
        if (cookies['refresh-token'] && cookies['access-token']) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
        setLoading(false);
    })

    async function logoutHandler() {
        const cookies = parseCookies()
        const refreshToken: string = cookies['refresh-token']
        const accessToken: string = cookies['access-token']
        if (refreshToken && accessToken) {
            console.log({
                method: "POST",
                body: JSON.stringify({
                    "refresh_token": refreshToken
                }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                redirect: 'follow'
            })
            await fetch("http://localhost:8000/auth/logout/", {
                method: "POST",
                body: JSON.stringify({
                    "refresh_token": refreshToken
                }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + accessToken

                },
                redirect: 'follow'
            })
            localStorage.removeItem("email")
            localStorage.removeItem("image")
            localStorage.removeItem("username")
            destroyCookie(null, "refresh-token")
            destroyCookie(null, "access-token")
            setLoggedIn(false);
            await router.replace("/signin")
        }
    }

    return <div>
        {loading ? <div>Loading</div> : null}
        {!loading && loggedIn ? <Button size='small' color='green' onClick={logoutHandler}>
            <Icon name='log out'/>
            LogOut
        </Button> : null}
        {!loading && loggedIn ? <Link href={"reset-password"}>
            <Button size='small' color='green'>
                <Icon name='leaf'/>
                Reset Password
            </Button></Link> : null}
        {!loading && !loggedIn ? <Link href={"signin"}><Button size='small' color='black'>
            <Icon name='sign-in'/>
            SignIn
        </Button></Link> : null}
        {!loading && !loggedIn ?
            <Link href={"/signup"}>
                <Button size='small' color='black'>
                    <Icon name='sign-in alternate'/>
                    SignUp
                </Button>
            </Link> : null}
    </div>
}

export default Navbar;