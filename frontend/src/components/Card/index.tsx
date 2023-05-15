import React from 'react';

import './index.css'

interface CardProps {
    title: string;
    url: string;
}

export const Card = ({title, url}: CardProps) => {
    return (
        <div className="card">
            <a target="_blank" rel="noreferrer" href={url}>
                <img src={url} alt={title} />
            </a>
            <div>{title}</div>
        </div>
    );
};
