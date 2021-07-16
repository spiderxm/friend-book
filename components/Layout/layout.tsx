import Head from 'next/head';
import React, {Fragment} from "react";
import Navbar from "./navbar";

interface LayoutProps {
    children: any
}

const Layout: React.FC<LayoutProps> = (props) => {
    return <Fragment>
        <Head>
            <script src="dist/notiflix-aio-3.0.1.min.js"></script>
            <link href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" rel="stylesheet"/>
        </Head>

        <Navbar/>
        {props.children}
    </Fragment>
};

export default Layout;