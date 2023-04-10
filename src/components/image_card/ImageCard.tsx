import React, { useState } from "react";
import styles from './ImageCard.module.css';
import Link from "next/link";
import { randomColorRGB } from '../../lib/random'
import Image from "next/image";
import { Avatar, Rate, Space, Typography } from "@arco-design/web-react";
import { IconStarFill } from '@arco-design/web-react/icon';
import humanFormat from 'human-format';

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
            <div>
                <Image src={previewImageUrl} width={width} height={height} alt={title} style={{ objectFit: 'cover', objectPosition: '50%' }} />
            </div>
            <div className={styles['image-card-descriptor']}>
                <div className={styles['image-card-descriptor-avatar']}>
                    <Avatar size={40} className={styles['image-card-descriptor-avatar-image']}>J</Avatar>
                </div>
                <div className={styles['image-card-descriptor-panel']}>
                    <div className={styles['image-card-descriptor-panel-title']}>
                        <div className={styles['image-card-descriptor-panel-title-text']} style={{ flex: '1 1 0%', lineHeight: '1' }}>{title}</div>
                    </div>
                    <div className={styles['image-card-descriptor-panel-info']}>
                        <div className={styles['image-card-descriptor-panel-info-score']}>
                            <Space size="medium">
                                <Rate readonly defaultValue={score} character={<IconStarFill style={{ fontSize: 14, marginRight: -5 }} />} />
                                <span>{humanFormat(scoreCount, {
                                    maxDecimals: 1
                                })}</span>
                            </Space>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </div>
}

export default ImageCard;