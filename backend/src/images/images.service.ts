import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, forkJoin, map, Observable } from 'rxjs';

import {
  FormattedImage,
  Image,
  Photo,
} from '../shared/interfaces/images.interface';
import * as process from 'process';

@Injectable()
export class ImagesService {
  constructor(private readonly httpService: HttpService) {}

  public getAll(): Observable<FormattedImage[]> {
    return forkJoin([this.getImages(), this.getPhotos()]).pipe(
      map(([images, photos]) => {
        const formattedImages = images
          .flat()
          .map(({ albumId, id, title, path }) => ({
            albumId,
            id,
            title,
            url: path,
          }));

        const formattedPhotos = photos
          .flat()
          .map(({ albumId, id, title, url }) => ({
            albumId,
            id: formattedImages.length + id,
            title,
            url,
          }));
        return [...formattedImages, ...formattedPhotos];
      }),
      catchError((error) => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }),
    );
  }

  public getPhotos(): Observable<Photo[][]> {
    return this.httpService
      .get(`${process.env.IMAGE_BASE_URL}/photos`)
      .pipe(map((response) => response.data));
  }

  public getImages(): Observable<Image[][]> {
    return this.httpService
      .get(`${process.env.IMAGE_BASE_URL}/images`)
      .pipe(map((response) => response.data));
  }
}
