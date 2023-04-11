import { CardType, IImageCard } from "./ImageCard";
import { randomInt, randomFloat } from "../../lib/random";

const base: IImageCard = {
    type: CardType.LORA,
    previewImageUrl: "https://imagecache.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/393713d6-c943-4c6a-7247-ad5f03583200/width=450/333323.jpeg",
    title: "hello world",
    score: 4.9,
    scoreCount: randomInt(1000, 100000),
    like: randomInt(1000, 100000),
    comment: randomInt(1000, 100000),
    download: randomInt(1000, 100000),
    width: 310,
    height: randomInt(200, 800),
};

export const mockImageCardProps = {
    base,
    new: () => ({
        type: CardType.LORA,
        previewImageUrl: "https://imagecache.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/393713d6-c943-4c6a-7247-ad5f03583200/width=450/333323.jpeg",
        title: "hello world",
        score: randomFloat(0, 5),
        scoreCount: randomInt(1000, 100000),
        like: randomInt(1000, 100000),
        comment: randomInt(1000, 100000),
        download: randomInt(1000, 100000),
        width: 310,
        height: randomInt(200, 800),
    }),
};