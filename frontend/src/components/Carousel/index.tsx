import React, { useState } from 'react';

import { ImagesProps } from '../../types/image';
import './index.css'

export const Carousel = ({images}: ImagesProps) => {
    const [image, setImage] = useState(images[2]);

    const handlePrevClick = () => {
        setImage((prevState) => images.indexOf(prevState) !== 0 ? images[images.indexOf(prevState)-1] : images[images.length-1]);
    }

    const handleNextClick = () => {
        setImage((prevState) => images.indexOf(prevState) !== images.length-1 ? images[images.indexOf(prevState)+1] : images[0]);
    }

    return (
        <div className="carousel-container">
            <h1>Carousel</h1>
            {images.length && (
                <>
                    <div className="images-container">
                        <div className="image-container"><img src={image.url} alt={image.title}/></div>
                    </div>

                    <button className="prev" onClick={handlePrevClick}>&#10094;</button>
                    <button className="next" onClick={handleNextClick}>&#10095;</button>

                    <br/>

                    <div className="carousel-dots">
                        {images.map((img) => <span className={`dot ${img.id === image.id && 'active'}`} onClick={() => setImage(img)}></span>)}
                    </div>
                </>
            )}
        </div>
    );
};
