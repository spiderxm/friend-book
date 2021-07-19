import {useState} from "react";
import {Search} from "semantic-ui-react";
import {parseCookies} from "nookies";
import {logoutUser} from "../../utility/auth";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import classes from "../profile/followers.module.css"
import Link from "next/link"

const SearchBar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [value, setValue] = useState<string>("");
    const resultRenderer = (data) => {
        const image = data.image;
        const username = data.username;
        return <Link href={"/profile/" + username}>
            return <div>

            <img ALIGN={'center'} src={image.startsWith("http") ? image : "http://localhost:8000" + image}
                 className={classes.followerUserImage}/>
            <h1 className={classes.username}>{username}</h1>
        </div>

        </Link>
    }
    const fetchResults = async (value: string) => {
        if (!parseCookies()['access-token'])
            return;
        setLoading(true);
        const response = await fetch("http://localhost:8000/info/users/?username=" + value, {
            headers: {
                "Authorization": "Bearer " + parseCookies()['access-token'],
                "Content-type": "application/json"
            }
        })
        if (response.ok) {
            const data = await response.json();
            setResults(data);
        } else {
            if (response.status === 401) {
                await logoutUser(dispatch, router);
            }
        }
        setLoading(false);
    }
    const searchHandler = async (event: any) => {
        // @ts-ignore
        setValue(event.target.value);
        await fetchResults(event.target.value);
    }
    return <div>
        <Search
            loading={loading}
            onResultSelect={(e, data) => {
                console.log(e, data)
            }}
            onSearchChange={searchHandler}
            results={results}
            resultRenderer={resultRenderer}
            value={value}
        />
    </div>
}
export default SearchBar;