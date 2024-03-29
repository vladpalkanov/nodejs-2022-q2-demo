import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  findAll(): Promise<Array<Track>> {
    return this.trackRepository.find({ relations: ['album', 'artist'] });
  }

  findOneById(id: string): Promise<Track> {
    return this.trackRepository.findOneBy({ id });
  }

  async save(track: Track): Promise<void> {
    await this.trackRepository.save(track);
  }

  async patch(trackId: string, trackPatch: Partial<Track>): Promise<void> {
    await this.trackRepository.update(trackId, trackPatch);
  }

  async delete(trackId: string): Promise<boolean> {
    const result = await this.trackRepository.delete(trackId);

    return result.affected > 0;
  }

  setAlbumToTrack(track: Track, albumId: string): void {
    track.album = Album.fromObject({ id: albumId });
  }

  setArtistToTrack(track: Track, artistId: string): void {
    track.artist = Artist.fromObject({ id: artistId });
  }
}
