import {Fragment} from "react";
import SignupForm from "../components/SignUp/signup-form";
import {GetServerSideProps, NextApiRequest, NextPageContext} from "next";
import {isLoggedIn} from "../utility/auth";

function SignupPage() {
    return <Fragment>
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