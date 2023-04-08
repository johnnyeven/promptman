import { Space } from "@arco-design/web-react";
import { NextPageWithLayout } from "./page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";
import ImageCard from "@/components/image_card/ImageCard";
import { mockImageCardProps } from "@/components/image_card/ImageCard.mocks";

const Gallery: NextPageWithLayout = () => {
    return (
        <>
            <Space size={20}>
                <Space direction="vertical" size={20}>
                    <ImageCard {...mockImageCardProps.base} />
                </Space>
                <Space direction="vertical" size={20}>
                    <ImageCard {...mockImageCardProps.base} />
                </Space>
                <Space direction="vertical" size={20}>
                    <ImageCard {...mockImageCardProps.base} />
                </Space>
                <Space direction="vertical" size={20}>
                    <ImageCard {...mockImageCardProps.base} />
                </Space>
            </Space>
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