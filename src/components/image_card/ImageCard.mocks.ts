import { CardType, IImageCard } from "./ImageCard";

const base: IImageCard = {
    type: CardType.LORA,
    previewImageUrl: "https://imagecache.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/393713d6-c943-4c6a-7247-ad5f03583200/width=450/333323.jpeg",
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