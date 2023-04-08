import React from "react";
import styles from './ImageCard.module.css';

export interface IImageCard {
    sampleTextProp: string;
}

const ImageCard: React.FC<IImageCard> = ({ sampleTextProp }) => {
    return <div className={styles.component}>{sampleTextProp}</div>
}

export default ImageCard;