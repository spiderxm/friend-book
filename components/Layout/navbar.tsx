import React, {useEffect, useState} from "react";
import {Button, Icon, Menu} from "semantic-ui-react";
import Link from "next/link"
import {parseCookies} from "nookies";
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
    return <Menu secondary>
        <Menu.Item
            name='Feed'
            onClick={() => {
                router.push("/");
            }}
        >
        </Menu.Item>

        <Menu.Menu position={"right"}>
            {!loading && !loggedIn ? <Link href={"/signin"}><Button size='small' color='black'>
                <Icon name='sign-in' size={"large"}/>
                SignIn
            </Button></Link> : null}
            {!loading && !loggedIn ?
                <Link href={"/signup"}>
                    <Button size='small' color='black'>
                        <Icon name='sign-out alternate' size={"large"}/>
                        SignUp
                    </Button>
                </Link> : null}
            {!loading && loggedIn ? <Link href={"/profile/create-post"}>
                <Button size='small' color='twitter'>
                    <Icon name='image'/>
                    Create Post
                </Button></Link> : null}
            {!loading && loggedIn ? <Link href={"/profile"}>
                <Button size='small' color='black'>
                    <Icon name='user circle outline' size={"large"}/>
                    Profile
                </Button>
            </Link> : null}
        </Menu.Menu>
    </Menu>
}

export default Navbar;