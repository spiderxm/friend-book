import React, {useEffect, useState} from "react";
import classes from "./info.module.css";
import {Button, Icon} from "semantic-ui-react";
import Link from "next/link";
import {useRouter} from "next/router";
import {parseCookies} from "nookies";
import MyPosts from "./my-posts";
import Notiflix from "notiflix";
import {useDispatch} from "react-redux";
import myPostSlice from "../../store/my-posts";
import postSlice from "../../store/posts";

const ProfileInfo: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [fetchedFriends, setFetchFriends] = useState(false);
    const [friendsDataCount, setFriendsDataCount] = useState({
        follows: 0,
        followers: 0
    });
    const fetchFriendsInfo = async () => {
        const response = await fetch("http://localhost:8000/users/user-friends-count/", {
            headers: {
                "Authorization": "Bearer " + parseCookies()['access-token'],
                "Content-type": "application/json"
            }
        })
        if (response.ok) {
            const data = await response.json()
            setFriendsDataCount(data);
            setFetchFriends(true);
        }
    }
    useEffect(() => {
        if (!fetchedFriends) {
            fetchFriendsInfo();
        }
        const cookies = parseCookies();
        if (cookies['refresh-token'] && cookies['access-token']) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
        setLoading(false);
    }, [])

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
                    Notiflix.Loading.hourglass('Loading...');
                    await fetch("http://localhost:8000/auth/logout/", {
                        method: "POST",
                        body: JSON.stringify({
                            "refresh_token": refreshToken
                        }),
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + accessToken
                        },
                    })
                    document.cookie = `access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                    document.cookie = `refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                    document.cookie = `access-token=; path=/profile; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                    document.cookie = `refresh-token=; path=/profile; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                    localStorage.removeItem("email")
                    localStorage.removeItem("image")
                    localStorage.removeItem("username")
                    localStorage.removeItem("user_since")
                    dispatch(myPostSlice.actions.clearPosts)
                    dispatch(postSlice.actions.clearPosts)
                    await router.replace("/signin")
                    Notiflix.Loading.remove(100);
                    Notiflix.Notify.success("Logout Successful", {
                        timeout: 1000,
                        position: "right-bottom"
                    })
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
            {fetchedFriends ?
                <div className={classes.profile}>
                    <Link href={"/profile/following"}>
                        <Button size='small' color={"linkedin"}>
                            Following: {friendsDataCount.follows}
                        </Button>
                    </Link>
                    <Link href={"/profile/followers"}>
                        <Button size='small' color={"linkedin"}>
                            Followers: {friendsDataCount.followers}
                        </Button>
                    </Link>
                </div> : null}
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