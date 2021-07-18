import {useEffect, useState} from "react";
import {parseCookies} from "nookies";
import FollowersList from "../../components/profile/followers";

export interface FollowerDetails {
    follower: Follower;
    created_at: Date;
}

export interface Follower {
    image: string;
    username: string;
}

const FollwersDataPage = () => {
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