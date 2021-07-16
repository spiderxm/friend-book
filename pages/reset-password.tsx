import React from "react";
import ResetPasswordForm from "../components/ResetPassword/reset-password-form";
import {GetServerSideProps, NextApiRequest, NextPageContext} from "next";
import {isLoggedIn} from "../utility/auth";

const ResetPasswordPage: React.FC = () => {
    return <ResetPasswordForm></ResetPasswordForm>
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