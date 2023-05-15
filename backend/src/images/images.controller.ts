import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ImagesService } from './images.service';
import { FormattedImage } from '../shared/interfaces/images.interface';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  getAll(): Observable<FormattedImage[]> {
    return this.imagesService.getAll();
  }
}
