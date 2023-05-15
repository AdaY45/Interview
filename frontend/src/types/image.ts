interface Image {
    albumId: number;
    id: number;
    title: string;
    url: string;
}

export interface ImagesProps {
    images: Image[];
}
