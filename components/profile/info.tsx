import React, {useEffect, useState} from "react";
import classes from "./info.module.css";
import {Button, Icon} from "semantic-ui-react";
import Link from "next/link";
import {useRouter} from "next/router";
import {destroyCookie, parseCookies} from "nookies";
import MyPosts from "./my-posts";
import Notiflix from "notiflix";

const ProfileInfo: React.FC = () => {
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

        Notiflix.Confirm.show('Logout',
            'Are you sure you want to logout?',
            'Yes',
            'No',
            async function () {
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
                    localStorage.removeItem("email")
                    localStorage.removeItem("image")
                    localStorage.removeItem("username")
                    destroyCookie(null, "refresh-token")
                    destroyCookie(null, "access-token")
                    await router.replace("/signin")
                }
            },
            function () {
            return;
            });
    }

    const windowGlobal = typeof window !== 'undefined' && window;
    if (windowGlobal) {
        const email = localStorage.getItem("email");
        const username = localStorage.getItem("username");
        let image: string | null = ""
        if (localStorage.getItem("image")) {
            image = localStorage.getItem("image")!.startsWith("http") ? localStorage.getItem("image") : "http://localhost:8000" + localStorage.getItem("image");
        }
        const date: string | null = localStorage.getItem("user_since");
        let formattedDate: string | null = null;
        if (date) {
            formattedDate = new Date(date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric"
            })
        }
        return <div>
            <div className={classes.profile}>
                <img src={image!} className={classes.image} align={"center"}/>
                <div className={classes.info}>
                    {username ? <span className={classes.username}>{username}</span> : null}
                    {email ? <span className={classes.email}>{email}</span> : null}
                    {formattedDate ? <span className={classes.userSince}>User Since: {formattedDate}</span> : null}
                </div>

            </div>
            <div className={classes.profile}>
                {!loading && loggedIn ? <Link href={"reset-password"}>
                    <Button size='small' color='twitter'>
                        <Icon name='leaf'/>
                        Reset Password
                    </Button></Link> : null}

                {!loading && loggedIn ? <Link href={"profile/update"}><Button size='small' color='twitter'>
                    <Icon name='id card outline'/>
                    Update Photo
                </Button></Link> : null}
                <Link href={"privacy-policy"}><Button size='small' color='twitter'>
                    <Icon name='id card outline'/>
                    Privacy Policy
                </Button></Link>
                {!loading && loggedIn ? <Button size='small' color='google plus' onClick={logoutHandler}>
                    <Icon name='log out'/>
                    LogOut
                </Button> : null}
            </div>
            <MyPosts/>

        </div>;
    } else {
        return <div>

        </div>
    }

}

export default ProfileInfo;