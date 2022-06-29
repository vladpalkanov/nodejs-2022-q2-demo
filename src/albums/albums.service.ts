import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  findAll(): Promise<Array<Album>> {
    return this.albumRepository.find({ relations: ['tracks', 'artist'] });
  }

  findOneById(id: string): Promise<Album> {
    return this.albumRepository.findOne({
      where: { id },
      relations: ['tracks'],
    });
  }

  async save(album: Album): Promise<void> {
    await this.albumRepository.save(album);
  }

  async delete(albumId: string): Promise<boolean> {
    const result = await this.albumRepository.delete(albumId);

    return result.affected > 0;
  }

  setTracksToAlbum(album: Album, trackIds: string[]): void {
    album.tracks = trackIds.map((trackId) => Track.fromObject({ id: trackId }));
  }

  setArtistToAlbum(album: Album, artistId: string): void {
    album.artist = Artist.fromObject({ id: artistId });
  }

  async addTrackToAlbum(album: Album, track: Track): Promise<void> {
    album.tracks.push(track);

    this.save(album);
  }
}
