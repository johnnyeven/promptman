import { Grid } from "@arco-design/web-react";
import { NextPageWithLayout } from "./page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";
import ImageCard from "@/components/image_card/ImageCard";
import CardFilter from "@/components/card_filter/CardFilter";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Row = Grid.Row;
const Col = Grid.Col;

const Gallery: NextPageWithLayout = () => {
    return (
        <>
            <Row align="start" gutter={[20, 20]}>
                <Col span={24}>
                    <CardFilter enableSort={true} enableFilter={true} />
                </Col>
            </Row>
            <Row align="start" gutter={20}>
                <Col span={6}>

                </Col>
                <Col span={6}>

                </Col>
                <Col span={6}>

                </Col>
                <Col span={6}>

                </Col>
            </Row>
        </>
    )
};

export default Gallery;

Gallery.getLayout = (page) => {
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