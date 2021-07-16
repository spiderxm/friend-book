import React from "react";
import CreatePostForm from "../../components/post/create-post";
import {GetServerSideProps, NextApiRequest, NextPageContext} from "next";
import {isLoggedIn} from "../../utility/auth";


const CreatePostPage: React.FC = () => {
    return <CreatePostForm></CreatePostForm>
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

export default CreatePostPage;