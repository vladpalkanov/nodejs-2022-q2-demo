import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToInstance } from 'class-transformer';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Track {
  static fromObject(object: Partial<Track>): Track {
    return plainToInstance<Track, Partial<Track>>(Track, object);
  }

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @ManyToOne<Artist>(() => Artist, (artist) => artist.tracks)
  @ApiProperty({ type: Artist })
  artist: Artist;

  @ManyToOne<Album>(() => Album, (album) => album.tracks)
  @ApiProperty({ type: Album })
  album: Album;

  @Column({ type: 'int', width: 4 })
  @ApiProperty()
  duration: number;

  @VersionColumn()
  @ApiProperty()
  version: number;

  @CreateDateColumn()
  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  createdAt: string;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  updtedAt: string;
}
