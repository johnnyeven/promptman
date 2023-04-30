import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageWithLayout } from "./page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";

const Editor: NextPageWithLayout = () => {
    return (
        <>
        </>
    )
};

export default Editor;

Editor.getLayout = (page) => {
    return (
        <PrimaryLayout>
            {page}
        </PrimaryLayout>
    );
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'locale_switcher'])),
        },
    };
}