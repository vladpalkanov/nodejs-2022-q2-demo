import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from 'src/tracks/entities/track.entity';
import { Repository } from 'typeorm';
import { Favourites } from './entities/favourites.entity';

type Relation = 'tracks';

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
      relations: relations ?? ['tracks'],
    });
  }

  async addTrackToFavourites(userId: string, track: Track): Promise<void> {
    let favourites = await this.findByUserId(userId, ['tracks']);

    if (!favourites) {
      favourites = Favourites.fromObject({ userId, tracks: [] });
    }

    favourites.tracks.push(track);

    await this.favouriteRepository.save(favourites);
  }

  async removeTrackFromFavourites(userId: string, track: Track): Promise<void> {
    const favourites = await this.findByUserId(userId, ['tracks']);

    if (!favourites) {
      return;
    }

    const index = favourites.tracks.findIndex((t) => t.id === track.id);

    if (index === -1) {
      return;
    }

    favourites.tracks.splice(index, 1);

    await this.favouriteRepository.save(favourites);
  }
}
