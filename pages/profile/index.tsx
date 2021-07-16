import React from "react";
import ProfileInfo from "../../components/profile/info";
import {GetServerSideProps, NextApiRequest, NextPageContext} from "next";
import {isLoggedIn} from "../../utility/auth";

const UserProfilePage: React.FC = () => {
    return <div>
        <ProfileInfo/>
    </div>;
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
export default UserProfilePage;