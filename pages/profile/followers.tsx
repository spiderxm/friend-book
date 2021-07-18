import {useEffect, useState} from "react";
import {parseCookies} from "nookies";
import FollowersList from "../../components/profile/followers";
import {logoutUser} from "../../utility/auth";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

export interface FollowerDetails {
    follower: Follower;
    created_at: Date;
}

export interface Follower {
    image: string;
    username: string;
}

const FollwersDataPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [followers, setFollowers] = useState<FollowerDetails[]>([]);
    const [fetchedFollowers, setFetchedFollowers] = useState(false);
    const fetchFollowers = async () => {
        const response = await fetch("http://localhost:8000/users/followers/", {
            headers: {
                "Authorization": "Bearer " + parseCookies()['access-token'],
                "Content-type": "application/json"
            }
        });
        if (response.ok) {
            const data = await response.json()
            setFollowers(data.followers)
            setFetchedFollowers(true);
        } else {
            if (response.status === 401) {
                await logoutUser(dispatch, router);
            }
        }
    }
    useEffect(() => {
        if (!fetchedFollowers) {
            fetchFollowers()
        }
    }, []);
    return <div>
        {fetchedFollowers ? <FollowersList followers={followers}/> : null}
    </div>;
}

export default FollwersDataPage;