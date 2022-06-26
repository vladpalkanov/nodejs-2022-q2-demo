import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrmModule } from './orm/orm.module';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavouritesModule } from './favourites/favourites.module';
import { MoviesModule } from './movies/movies.module';
import { BooksModule } from './books/books.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    OrmModule,
    UsersModule,
    AuthModule,
    LoggerModule,
    TracksModule,
    AlbumsModule,
    FavouritesModule,
    MoviesModule,
    BooksModule,
    ArtistsModule,
  ],
})
export class AppModule {}
