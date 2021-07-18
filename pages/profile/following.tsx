import {useEffect, useState} from "react";
import {parseCookies} from "nookies";
import FollowingList from "../../components/profile/following";
import {Loader} from "semantic-ui-react";
import {logoutUser} from "../../utility/auth";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

export interface FollowingDetails {
    follows: Follows;
    created_at: Date;
}

export interface Follows {
    image: string;
    username: string;
}

const FollowingDataPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [following, setFollowing] = useState<FollowingDetails[]>([]);
    const [fetchedFollows, setFetchedFollows] = useState(false);
    const fetchFollowers = async () => {
        const response = await fetch("http://localhost:8000/users/following/", {
            headers: {
                "Authorization": "Bearer " + parseCookies()['access-token'],
                "Content-type": "application/json"
            }
        });
        if (response.ok) {
            const data = await response.json()
            setFollowing(data.follows)
            setFetchedFollows(true);
        } else {
            if (response.status === 401) {
                await logoutUser(dispatch, router);
            }
        }
    }
    useEffect(() => {
        if (!fetchedFollows) {
            fetchFollowers()
        }
    }, []);
    return <div>
        {fetchedFollows ? <FollowingList following={following}/> : null}
        {!fetchedFollows ? <Loader active inline={"centered"}/> : null}
    </div>;
}

export default FollowingDataPage