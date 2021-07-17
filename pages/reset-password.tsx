import React from "react";
import ResetPasswordForm from "../components/ResetPassword/reset-password-form";
import {GetServerSideProps, NextApiRequest, NextPageContext} from "next";
import {isLoggedIn} from "../utility/auth";
import Head from "next/head";

const ResetPasswordPage: React.FC = () => {
    return <React.Fragment>
        <Head>
            <title>Reset Password</title>
        </Head>
        <ResetPasswordForm/>
    </React.Fragment>
}

export const getServerSideProps: GetServerSideProps = async (context: Pick<NextPageContext, "req"> | { req: NextApiRequest; } | { req: any; } | null | undefined) => {
    if (!isLoggedIn(context)) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        }
    }
    return {
        props: {},
    }
}
export default ResetPasswordPage;