import {GetServerSideProps, NextApiRequest, NextPageContext} from "next";
import {isLoggedIn} from "../utility/auth";
import ResendEmailForm from "../components/resend-email/resend-email";

const ResendVerificationEmail = () => {
    return <ResendEmailForm/>
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
export default ResendVerificationEmail;