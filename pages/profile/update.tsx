import {GetServerSideProps, NextApiRequest, NextPageContext} from "next";
import {isLoggedIn} from "../../utility/auth";
import UpdateImageForm from "../../components/profile/updateImage";
import React from "react";

const UpdateProfilePage: React.FC = () => {
    return <div>
        <UpdateImageForm/>
    </div>
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

export default UpdateProfilePage