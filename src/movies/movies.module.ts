import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouritesModule } from 'src/favourites/favourites.module';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), FavouritesModule],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
