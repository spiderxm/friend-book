import React, {useEffect, useState} from "react";
import {Button, Divider, Icon} from "semantic-ui-react";
import Link from "next/link"
import {parseCookies} from "nookies";
import SearchBar from "./search";
import classes from "./navbar.module.css"
import {Menu as MenuIcon} from "@material-ui/icons"

const Navbar: React.FC = () => {
    const [showMenu, setShowMenu] = useState(false);
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

    return <nav className={classes.navbar}>
        <Link href={"/"}>
            <h1 className={classes.heading}>ᖴᖇIEᑎᗪᗷOOK</h1>
        </Link>
        {!loading && loggedIn ?
            <div className={classes.search}><SearchBar/></div>
            : null}
        <div className={classes.buttonMenu}>
            {!loading && !loggedIn ?
                <Link href={"/signup"}>
                    <Button size='small' color='twitter' className={classes.button}>
                        <Icon name='sign-out alternate' size={"large"}/>
                        SignUp
                    </Button>
                </Link> : null}
            {!loading && !loggedIn ?
                <Link href={"/signin"}><Button size='small' color='twitter' className={classes.button}>
                    <Icon name='sign-in' size={"large"}/>
                    SignIn
                </Button></Link> : null}

            {!loading && loggedIn ? <Link href={"/profile"}>
                <Button size='small' color='twitter' className={classes.button}>
                    <Icon name='user circle outline' size={"large"}/>
                    Profile
                </Button>
            </Link> : null}
            {!loading && loggedIn ? <Link href={"/profile/create-post"}>
                <Button size='small' color='twitter' className={classes.button}>
                    <Icon name='image' size={"large"}/>
                    Create Post
                </Button></Link> : null}
        </div>
        <div className={classes.menuOpener} onClick={() => setShowMenu(showMenu => !showMenu)}>
            <MenuIcon/>
        </div>
        {showMenu ? <div className={classes.menu}>
            <Divider/>

            {!loading && loggedIn ?
                <div className={classes.div}>
                    <div className={classes.searchBar}><SearchBar/></div>
                    <Divider/>
                </div>
                : null}
            {!loading && !loggedIn ? <div className={classes.div}>
                <Link href={"/signin"}><Button size='small' color='twitter'>
                    <Icon name='sign-in' size={"large"} className={classes.menuButton}/>
                    SignIn
                </Button></Link>
                <Divider/>

            </div> : null}
            {!loading && !loggedIn ?
                <div className={classes.div}>
                    <Link href={"/signup"}>
                        <Button size='small' color='twitter' className={classes.menuButton}>
                            <Icon name='sign-out alternate' size={"large"}/>
                            SignUp
                        </Button>
                    </Link>
                    <Divider/>

                </div> : null}
            {!loading && loggedIn ? <div className={classes.div}>
                <Link href={"/profile/create-post"}>
                    <Button size='small' color='twitter' className={classes.menuButton}>
                        <Icon name='image' size={"large"}/>
                        Create Post
                    </Button></Link>
                <Divider/>

            </div> : null}
            {!loading && loggedIn ? <div className={classes.div}>
                <Link href={"/profile"}>
                    <Button size='small' color='twitter' className={classes.menuButton}>
                        <Icon name='user circle outline' size={"large"}/>
                        Profile
                    </Button>
                </Link>
                <Divider/>

            </div> : null}
        </div> : null}
    </nav>
}

export default Navbar;