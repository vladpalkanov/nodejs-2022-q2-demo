import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Track } from 'src/tracks/entities/track.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Favourites {
  static fromObject(object: Partial<Favourites>): Favourites {
    return plainToInstance<Favourites, Partial<Favourites>>(Favourites, object);
  }

  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id: string;

  @Column()
  @ApiHideProperty()
  userId: string;

  @ManyToMany(() => Track)
  @JoinTable()
  @ApiProperty()
  tracks: Array<Track>;

  @VersionColumn()
  @ApiProperty()
  version: number;

  @CreateDateColumn()
  @ApiHideProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiHideProperty()
  updatedAt: Date;
}
