import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { WithUser } from 'src/auth/decorators/with-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Favourites } from './entities/favourites.entity';
import { FavouritesService } from './favourites.service';

@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async findAll(@WithUser('userId') userId: string): Promise<Favourites> {
    return this.favouritesService.findByUserId(userId);
  }
}
