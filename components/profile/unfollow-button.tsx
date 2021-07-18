import {Button} from "semantic-ui-react";
import Notiflix from "notiflix";
import React from "react";
import {parseCookies} from "nookies";

interface Props {
    username: string;
    setFollows: (b: boolean) => void;
    setFollowers: (p: (followers: number) => any) => void;
}

const UnFollowButton: React.FC<Props> = (props) => {

    const UnfollowHandler = async () => {
        Notiflix.Confirm.show(
            'Follow ' + props.username,
            'Are You Sure? ',
            'Yes',
            'No',
            async function () {
                const response = await fetch("http://localhost:8000/users/un-follow/", {
                    body: JSON.stringify({
                        username: props.username
                    }),
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + parseCookies()['access-token'],
                        "Content-type": "application/json"
                    }
                })
                response.status
                if (response.ok) {
                    props.setFollows(false);
                    props.setFollowers((followers) => followers - 1)
                }
            }, function () {
                return;
            })
    }
    return <Button size='small' color={"youtube"} onClick={UnfollowHandler}>
        Un Follow
    </Button>
}


export default UnFollowButton;
