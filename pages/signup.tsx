import {Fragment} from "react";
import SignupForm from "../components/SignUp/signup-form";
import {GetServerSideProps, NextApiRequest, NextPageContext} from "next";
import {isLoggedIn} from "../utility/auth";
import Head from "next/head";

function SignupPage() {
    return <Fragment>
        <Head>
            <title>Sign Up</title>
        </Head>
        <SignupForm/>
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
export default SignupPage;