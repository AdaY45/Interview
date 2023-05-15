import React, { useEffect, useState } from 'react';

import { Gallery } from './components/Gallery';
import { Carousel } from './components/Carousel';
import { Toggle } from './components/Toggle';

import './App.css';

export function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [images, setImages] = useState([]);
    const [showType, setShowType] = useState('gallery');

    const getImages = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/images`);
            const images = await response.json();
            setImages(images);
        } catch (error) {
            setError('Failed getting images');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getImages();
    }, []);

    const toggleClickHandler = (isToggled: boolean) => {
        setShowType(isToggled ? 'gallery' : 'carousel');
    }

  return (
    <>
        {isLoading ? <div>Loading...</div> : <>
            <Toggle
                label={showType}
                toggled={true}
                onClick={toggleClickHandler}
            />
            {showType === 'gallery' ? <Gallery images={images}/> : <Carousel images={images} />}
        </>}
        {error && <div className="error">{error}</div>}
    </>
  );
}
