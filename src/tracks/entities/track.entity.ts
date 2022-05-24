import { ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToInstance } from 'class-transformer';
import { Album } from 'src/albums/entities/album.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
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

  @Column()
  @ApiProperty()
  singer: string;

  @ManyToOne<Album>(() => Album, (album) => album.tracks, {
    onDelete: 'SET NULL',
  })
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
  createdAt: string;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  updtedAt: string;
}
