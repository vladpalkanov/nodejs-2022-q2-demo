import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  findAll(): Promise<Array<Album>> {
    return this.albumRepository.find();
  }

  findOneById(id: string): Promise<Album> {
    return this.albumRepository.findOneBy({ id });
  }

  async create(album: Album): Promise<void> {
    await this.albumRepository.save(album);
  }

  async patch(albumId: string, albumPatch: Partial<Album>): Promise<void> {
    await this.albumRepository.update(albumId, albumPatch);
  }

  async delete(albumId: string): Promise<boolean> {
    const result = await this.albumRepository.delete(albumId);

    return result.affected > 0;
  }
}
