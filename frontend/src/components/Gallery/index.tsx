import React from 'react';

import { Card } from '../Card';
import { ImagesProps } from '../../types/image';
import './index.css'

export const Gallery = ({ images }: ImagesProps) => {
    return (
        <>
            <h1>Gallery</h1>
            <div className="gallery-container">{images.map(({title, url}) => <Card title={title} url={url}/>)}</div>
        </>
    );
};
