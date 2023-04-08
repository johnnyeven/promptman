import React from "react";
import styles from './ImageCard.module.css';
import Link from "next/link";

export enum CardType {
    LORA = 'lora',
    CHECKPOINT = 'checkpoint',
}

export interface IImageCard {
    type: CardType;
    previewImageUrl: string;
    title: string;
    score: number;
    scoreCount: number;
    like: number;
    comment: number;
    download: number;
    width: number;
    height: number;
}

const ImageCard: React.FC<IImageCard> = ({ type, previewImageUrl, title, score, scoreCount, like, comment, download, width, height }) => {
    return <div className={styles['image-card-indicator-root']} style={{ width: width + 'px' }}>
        <Link className={styles['image-card-root']} style={{ height: height + 'px' }} href={""}>

        </Link>
    </div>
}

export default ImageCard;