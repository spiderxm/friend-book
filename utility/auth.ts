import {NextApiRequest, NextPageContext} from "next";
import {parseCookies} from "nookies";
import Notiflix from "notiflix";
import myPostSlice from "../store/my-posts";
import postSlice from "../store/posts";

export const isLoggedIn = (context: Pick<NextPageContext, "req"> | { req: NextApiRequest; } | { req: any; } | null | undefined) => {
    const cookies = parseCookies(context);
    return cookies['refresh-token'] && cookies['access-token'];
}

export const logoutUser = async (dispatch: any, router: any) => {
    Notiflix.Loading.hourglass('Loading...');

    await fetch("http://localhost:8000/auth/logout/", {
        method: "POST",
        body: JSON.stringify({
            "refresh_token": parseCookies()['refresh-token']
        }),
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + parseCookies()['refresh-token']
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
    Notiflix.Notify.failure("You are logged out. Please login again.", {
        timeout: 1000,
        position: "right-bottom"

    })

}