import { CardType, IImageCard } from "./ImageCard";

const base: IImageCard = {
    type: CardType.LORA,
    previewImageUrl: "",
    title: "hello world",
    score: 4.9,
    scoreCount: 1928313,
    like: 323456,
    comment: 12354312,
    download: 90000,
    width: 310,
    height: 510,
};

export const mockImageCardProps = {
    base,
};