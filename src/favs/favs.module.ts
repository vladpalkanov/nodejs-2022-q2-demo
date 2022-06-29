import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { Favs } from './entities/favs.entity';
import { MoviesModule } from 'src/movies/movies.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { BooksModule } from 'src/books/books.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favs]),
    MoviesModule,
    TracksModule,
    BooksModule,
    AlbumsModule,
    ArtistsModule,
  ],
  providers: [FavsService],
  controllers: [FavsController],
  exports: [FavsService],
})
export class FavsModule {}
