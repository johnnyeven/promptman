import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageWithLayout } from "./page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";
import { Typography } from "@arco-design/web-react";
import { useTranslation } from "next-i18next";

const { Title, Paragraph, Text } = Typography;

const Editor: NextPageWithLayout = () => {
    const { t } = useTranslation('editor')
    return (
        <>
            <Typography>
                <Title>{t('page.title')}</Title>
                <Paragraph>
                    {t('page.description')}
                </Paragraph>
            </Typography>
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
            ...(await serverSideTranslations(locale, ['common', 'locale_switcher', 'editor'])),
        },
    };
}