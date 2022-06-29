import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Book } from 'src/books/entities/book.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Repository } from 'typeorm';
import { Favs } from './entities/favs.entity';

type Relation = 'tracks' | 'movies' | 'books' | 'albums' | 'artists';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Favs)
    private readonly favsRepository: Repository<Favs>,
  ) {}

  findByUserId(userId: string, relations?: Array<Relation>): Promise<Favs> {
    return this.favsRepository.findOne({
      where: { userId },
      relations: relations ?? ['tracks', 'movies', 'books'],
    });
  }

  addTrackToFavsForUser(track: Track, userId: string): Promise<void> {
    return this.addEntityToFavsForUser('tracks', track, userId);
  }

  removeTrackToFavsForUser(track: Track, userId: string): Promise<void> {
    return this.removeEntityFromFavsForUser('tracks', track, userId);
  }

  addMovieToFavsForUser(movie: Movie, userId: string): Promise<void> {
    return this.addEntityToFavsForUser('movies', movie, userId);
  }

  removeMovieToFavsForUser(movie: Movie, userId: string): Promise<void> {
    return this.removeEntityFromFavsForUser('movies', movie, userId);
  }

  addBookToFavsForUser(book: Book, userId: string): Promise<void> {
    return this.addEntityToFavsForUser('books', book, userId);
  }

  removeBookToFavsForUser(book: Book, userId: string): Promise<void> {
    return this.removeEntityFromFavsForUser('books', book, userId);
  }

  addAlbumToFavsForUser(album: Album, userId: string): Promise<void> {
    return this.addEntityToFavsForUser('albums', album, userId);
  }

  removeAlbumToFavsForUser(album: Album, userId: string): Promise<void> {
    return this.removeEntityFromFavsForUser('albums', album, userId);
  }

  addArtistToFavsForUser(artist: Artist, userId: string): Promise<void> {
    return this.addEntityToFavsForUser('artists', artist, userId);
  }

  removeArtistToFavsForUser(artist: Artist, userId: string): Promise<void> {
    return this.removeEntityFromFavsForUser('artists', artist, userId);
  }

  private async addEntityToFavsForUser(
    entityName: Relation,
    entity: any,
    userId: string,
  ): Promise<void> {
    let favs = await this.findByUserId(userId, [entityName]);

    if (!favs) {
      favs = Favs.fromObject({ userId, [entityName]: [] });
    }

    favs[entityName].push(entity);

    await this.favsRepository.save(favs);
  }

  private async removeEntityFromFavsForUser(
    entityName: Relation,
    entity: any,
    userId: string,
  ): Promise<void> {
    const favs = await this.findByUserId(userId, [entityName]);

    if (!favs) {
      return;
    }

    const index = favs[entityName].findIndex((item) => item.id === entity.id);

    if (index === -1) {
      return;
    }

    favs[entityName].splice(index, 1);

    await this.favsRepository.save(favs);
  }
}
