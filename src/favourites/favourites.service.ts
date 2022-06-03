import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Repository } from 'typeorm';
import { Favourites } from './entities/favourites.entity';

type Relation = 'tracks' | 'movies';
@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(Favourites)
    private readonly favouriteRepository: Repository<Favourites>,
  ) {}

  findByUserId(
    userId: string,
    relations?: Array<Relation>,
  ): Promise<Favourites> {
    return this.favouriteRepository.findOne({
      where: { userId },
      relations: relations ?? ['tracks', 'movies'],
    });
  }

  addTrackToFavouritesForUser(track: Track, userId: string): Promise<void> {
    return this.addEntityToFavouritesForUser('tracks', track, userId);
  }

  removeTrackToFavouritesForUser(track: Track, userId: string): Promise<void> {
    return this.removeEntityFromFavouritesForUser('tracks', track, userId);
  }

  addMovieToFavouritesForUser(track: Movie, userId: string): Promise<void> {
    return this.addEntityToFavouritesForUser('movies', track, userId);
  }

  removeMovieToFavouritesForUser(track: Movie, userId: string): Promise<void> {
    return this.removeEntityFromFavouritesForUser('movies', track, userId);
  }

  private async addEntityToFavouritesForUser(
    entityName: Relation,
    entity: any,
    userId: string,
  ): Promise<void> {
    let favourites = await this.findByUserId(userId, [entityName]);

    if (!favourites) {
      favourites = Favourites.fromObject({ userId, [entityName]: [] });
    }

    favourites[entityName].push(entity);

    await this.favouriteRepository.save(favourites);
  }

  private async removeEntityFromFavouritesForUser(
    entityName: Relation,
    entity: any,
    userId: string,
  ): Promise<void> {
    const favourites = await this.findByUserId(userId, [entityName]);

    if (!favourites) {
      return;
    }

    const index = favourites[entityName].findIndex(
      (item) => item.id === entity.id,
    );

    if (index === -1) {
      return;
    }

    favourites[entityName].splice(index, 1);

    await this.favouriteRepository.save(favourites);
  }
}
