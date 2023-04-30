import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextPageWithLayout } from './page'
import { appWithTranslation } from "next-i18next";

interface AppPropsWithLayout extends AppProps {
    Component: NextPageWithLayout;
}

function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page) => page);
    return getLayout(
        <Component {...pageProps} />
    )
}

export default appWithTranslation(App as any);
