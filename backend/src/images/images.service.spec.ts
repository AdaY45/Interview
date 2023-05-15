import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

import { ImagesService } from './images.service';

describe('ImagesService', () => {
  let imagesService: ImagesService;
  let httpService: HttpService;

  const images = [
    [
      {
        albumId: 2,
        id: 0,
        title: 'test',
        path: 'image-test',
      },
    ],
  ];
  const photos = [
    [
      {
        albumId: 1,
        id: 0,
        title: 'test',
        url: 'photos-test',
        thumbnailUrl: 'test',
      },
    ],
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ImagesService],
    }).compile();

    imagesService = module.get<ImagesService>(ImagesService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('getAll', () => {
    it('should return an array of formatted images', () => {
      jest.spyOn(imagesService, 'getImages').mockReturnValueOnce(of(images));
      jest.spyOn(imagesService, 'getPhotos').mockReturnValueOnce(of(photos));

      imagesService.getAll().subscribe((images) => {
        expect(images).toStrictEqual([
          {
            albumId: 2,
            id: 0,
            title: 'test',
            url: 'image-test',
          },
          {
            albumId: 1,
            id: 1,
            title: 'test',
            url: 'photos-test',
          },
        ]);
      });
    });
  });

  describe('getPhotos', () => {
    it('should return an array of photos', () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of({ data: photos } as AxiosResponse));

      imagesService.getPhotos().subscribe((photos) => {
        expect(photos).toStrictEqual(photos);
      });
    });
  });

  describe('getImages', () => {
    it('should return an array of images', () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of({ data: images } as AxiosResponse));

      imagesService.getImages().subscribe((images) => {
        expect(images).toStrictEqual(images);
      });
    });
  });
});
