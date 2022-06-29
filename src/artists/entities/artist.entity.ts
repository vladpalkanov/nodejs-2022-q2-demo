import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToInstance } from 'class-transformer';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Artist {
  static fromObject(object: Partial<Artist>): Artist {
    return plainToInstance<Artist, Partial<Artist>>(Artist, object);
  }

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  grammy: boolean;

  @OneToMany<Album>(() => Album, (album) => album.artist)
  @ApiProperty({
    type: Album,
    isArray: true,
  })
  albums: Array<Album>;

  @OneToMany<Track>(() => Track, (track) => track.album)
  @ApiProperty({
    type: Track,
    isArray: true,
  })
  tracks: Array<Track>;

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
