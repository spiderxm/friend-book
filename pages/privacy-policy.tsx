import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPolicy} from "../store/privacy-policy";
import {Message, Placeholder} from "semantic-ui-react";
import Head from "next/head";
import {RootState} from "../store";


const PrivacyPolicyPage: React.FC = () => {
    const {loading, privacyPolicy, error, errorMessage} = useSelector((state: RootState) => state.privacyPolicy)
    const dispatch = useDispatch();
    const [fetchedPolicy, setFetchedPolicy] = useState(false);
    useEffect(() => {
        if (!fetchedPolicy) {
            dispatch(fetchPolicy())
            setFetchedPolicy(true)
        }
    }, []);
    return <div>
        <Head>
            <title>Privacy Policy</title>
        </Head>
        {loading ? <Placeholder>
            <Placeholder.Paragraph>
                <Placeholder.Line/>
                <Placeholder.Line/>
                <Placeholder.Line/>
                <Placeholder.Line/>
                <Placeholder.Line/>
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
                <Placeholder.Line/>
                <Placeholder.Line/>
                <Placeholder.Line/>
            </Placeholder.Paragraph>
        </Placeholder> : null}
        {!loading && !error ? <div dangerouslySetInnerHTML={{__html: privacyPolicy as string}}/>
            : null}
        {!loading && error ? <Message negative>
            <Message.Header>Error </Message.Header>
            <p>{errorMessage}</p>
        </Message> : null}
    </div>;
}

export default PrivacyPolicyPage;