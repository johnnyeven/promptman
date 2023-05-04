import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextPageWithLayout } from './page'
import { appWithTranslation } from "next-i18next";
import { SessionProvider } from "next-auth/react";

interface AppPropsWithLayout extends AppProps {
    Component: NextPageWithLayout;
}

function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page) => page);
    return (
        <SessionProvider session={session}>
            {
                getLayout(
                    <Component {...pageProps} />
                )
            }
        </SessionProvider>
    )
}

export default appWithTranslation(App as any);
