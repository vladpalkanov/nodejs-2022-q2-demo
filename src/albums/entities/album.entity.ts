import { ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToInstance } from 'class-transformer';
import { Track } from 'src/tracks/entities/track.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
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

  @Column()
  @ApiProperty()
  singer: string;

  @OneToMany<Track>(() => Track, (track) => track.album, {
    orphanedRowAction: 'nullify',
  })
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
  createdAt: string;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  updtedAt: string;
}
