import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { Favourites } from './entities/favourites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favourites])],
  providers: [FavouritesService],
  controllers: [FavouritesController],
  exports: [FavouritesService],
})
export class FavouritesModule {}
