import {GetServerSideProps, NextApiRequest, NextPageContext} from "next";
import {isLoggedIn} from "../../utility/auth";
import UpdateImageForm from "../../components/profile/updateImage";
import React from "react";
import Head from "next/head";

const UpdateProfilePage: React.FC = () => {
    return <div>
        <Head>
            <title>Update Profile Image</title>
        </Head>
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