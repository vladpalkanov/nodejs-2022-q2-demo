import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Exclude, plainToInstance } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { MovieGenre } from '../types/movie-genre.enum';

@Entity()
export class Movie {
  static fromObject(plainObject: Partial<Movie>): Movie {
    return plainToInstance(Movie, plainObject);
  }

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ type: 'smallint' })
  @ApiProperty()
  year: number;

  @Column({ type: 'smallint' })
  @ApiProperty()
  duration: number;

  @Column({ type: 'varchar' }) // sqlite3 does not support enum
  @ApiProperty({ enum: MovieGenre })
  genre: MovieGenre;

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
