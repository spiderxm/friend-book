import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import Layout from "../components/Layout/layout";
import {Provider} from 'react-redux'
import {store} from '../store/index'
import 'semantic-ui-css/semantic.min.css'
import React from "react";
import Head from "next/head";

function MyApp({Component, pageProps}) {
    return <Provider store={store}>
        <Layout>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Component {...pageProps} />
        </Layout>
    </Provider>
}

export default MyApp;
