import {Fragment} from "react";
import SignInForm from "../components/SignIn/signin-form";
import {NextPageContext, NextApiRequest, GetServerSideProps} from "next";
import {isLoggedIn} from "../utility/auth";
import Head from "next/head";

function SignInPage() {
    return <Fragment>
        <Head>
            <title>Sign In</title>
        </Head>
        <SignInForm/>
    </Fragment>
}


export const getServerSideProps: GetServerSideProps = async (context: Pick<NextPageContext, "req"> | { req: NextApiRequest; } | { req: any; } | null | undefined) => {
    if (isLoggedIn(context)) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {},
    }
}

export default SignInPage;