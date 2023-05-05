import Image from 'next/image'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageWithLayout } from './page';
import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import { useTranslation } from 'next-i18next';

const Home: NextPageWithLayout = () => {
    const { t } = useTranslation('index');
    return (
        <>
            <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-black via-black lg:static lg:h-auto lg:w-auto lg:bg-none">

                </div>
            </div>

            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:blur-2xl after:content-[''] before:bg-gradient-to-br before:from-transparent before:to-blue-700/10 after:from-sky-900 after:via-[#0141ff]/40 before:lg:h-[360px]">
                <p style={{ fontSize: '5em' }}>
                    {t('page.title')}
                </p>
            </div>

            <div>
                <p style={{ width: '40em' }}>
                    {t('page.description')}
                </p>
            </div>
            <div className="mb-32 text-center lg:mb-0 items-center justify-between">
                <a
                    className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                    href="https://vercel.com?utm_source=johnnyeven&utm_campaign=oss"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/vercel.svg"
                        alt="Vercel Logo"
                        className="invert"
                        width={150}
                        height={30}
                        priority
                    />
                </a>
            </div>
        </>
    )
}

export default Home;

Home.getLayout = (page) => {
    return (
        <PrimaryLayout>
            {page}
        </PrimaryLayout>
    );
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'locale_switcher', 'user_control', 'index'])),
        },
    };
}