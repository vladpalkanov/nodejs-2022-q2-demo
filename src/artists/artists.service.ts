import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  findAll(): Promise<Array<Artist>> {
    return this.artistRepository.find({ relations: ['tracks'] });
  }

  findOneById(id: string): Promise<Artist> {
    return this.artistRepository.findOneBy({ id });
  }

  async save(artist: Artist): Promise<void> {
    await this.artistRepository.save(artist);
  }

  async patch(artistId: string, artistPatch: Partial<Artist>): Promise<void> {
    await this.artistRepository.update(artistId, artistPatch);
  }

  async delete(artistId: string): Promise<boolean> {
    const result = await this.artistRepository.delete(artistId);

    return result.affected > 0;
  }
}
