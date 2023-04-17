import { Grid } from "@arco-design/web-react";
import { NextPageWithLayout } from "./page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";
import ImageCard from "@/components/image_card/ImageCard";
import { mockImageCardProps } from "@/components/image_card/ImageCard.mocks";
import CardFilter from "@/components/card_filter/CardFilter";

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
                    <ImageCard {...mockImageCardProps.new()} />
                    <ImageCard {...mockImageCardProps.new()} />
                    <ImageCard {...mockImageCardProps.new()} />
                    <ImageCard {...mockImageCardProps.new()} />
                    <ImageCard {...mockImageCardProps.new()} />
                </Col>
                <Col span={6}>
                    <ImageCard {...mockImageCardProps.new()} />
                    <ImageCard {...mockImageCardProps.new()} />
                    <ImageCard {...mockImageCardProps.new()} />
                    <ImageCard {...mockImageCardProps.new()} />
                    <ImageCard {...mockImageCardProps.new()} />
                </Col>
                <Col span={6}>
                    <ImageCard {...mockImageCardProps.new()} />
                    <ImageCard {...mockImageCardProps.new()} />
                    <ImageCard {...mockImageCardProps.new()} />
                    <ImageCard {...mockImageCardProps.new()} />
                    <ImageCard {...mockImageCardProps.new()} />
                </Col>
                <Col span={6}>
                    <ImageCard {...mockImageCardProps.new()} />
                    <ImageCard {...mockImageCardProps.new()} />
                    <ImageCard {...mockImageCardProps.new()} />
                    <ImageCard {...mockImageCardProps.new()} />
                    <ImageCard {...mockImageCardProps.new()} />
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