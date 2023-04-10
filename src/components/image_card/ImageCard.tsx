import React from "react";
import styles from './ImageCard.module.css';
import Link from "next/link";
import { randomColorRGB } from '../../lib/random'

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
        <Link className={styles['image-card-root']} style={{ height: height + 'px', background: 'linear-gradient(' + randomColorRGB() + ' 0%, rgb(37, 38, 43) 100%)' }} href={""}>

        </Link>
    </div>
}

export default ImageCard;