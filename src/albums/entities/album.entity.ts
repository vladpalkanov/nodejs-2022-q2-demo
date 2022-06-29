import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToInstance } from 'class-transformer';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Album {
  static fromObject(object: Partial<Album>): Album {
    return plainToInstance<Album, Partial<Album>>(Album, object);
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
  @ApiHideProperty()
  @Exclude({ toPlainOnly: true })
  updtedAt: string;
}
