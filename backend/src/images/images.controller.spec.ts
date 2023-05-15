import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { HttpModule } from '@nestjs/axios';

import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';

describe('ImagesController', () => {
  let controller: ImagesController;
  let imagesService: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ImagesController],
      providers: [ImagesService],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
    imagesService = module.get<ImagesService>(ImagesService);
  });

  describe('getAll', () => {
    it('should return an array of formatted images', () => {
      const result = [
        {
          albumId: 1,
          id: 0,
          title: 'test',
          url: 'test',
        },
      ];
      jest.spyOn(imagesService, 'getAll').mockImplementation(() => of(result));

      controller.getAll().subscribe((images) => {
        expect(images).toStrictEqual(result);
      });
    });
  });
});
