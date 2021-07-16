import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import Layout from "../components/Layout/layout";
import { Provider } from 'react-redux'
import {store} from '../store/index'
import 'semantic-ui-css/semantic.min.css'

function MyApp({Component, pageProps}) {
    return <Provider store={store}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </Provider>
}

export default MyApp
