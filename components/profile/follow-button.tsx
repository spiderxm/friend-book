import {Button} from "semantic-ui-react";
import Notiflix from "notiflix";
import {parseCookies} from "nookies";

interface Props {
    username: string;
    setFollows: (b: boolean) => void;
    setFollowers: (p: (followers: number) => any) => void;
}

const FollowButton: React.FC<Props> = (props) => {
    const FollowHandler = async () => {
        Notiflix.Confirm.show(
            'Follow ' + props.username,
            'Are You Sure? ',
            'Yes',
            'No',
            async function () {
                const response = await fetch("http://localhost:8000/users/follow/", {
                    body: JSON.stringify({
                        username: props.username
                    }),
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + parseCookies()['access-token'],
                        "Content-type": "application/json"
                    }
                })
                if (response.ok) {
                    props.setFollows(true);
                    props.setFollowers((followers) => followers + 1);
                }
            }, function () {
                return;
            })
    }
    return <Button size='small' color={"linkedin"} onClick={FollowHandler}>
        Follow
    </Button>
}


export default FollowButton;
