interface BaseImage {
  albumId: number;
  id: number;
  title: string;
}

export interface Image extends BaseImage {
  path: string;
}

export interface Photo extends BaseImage {
  url: string;
  thumbnailUrl: string;
}

export interface FormattedImage extends BaseImage {
  url: string;
}
