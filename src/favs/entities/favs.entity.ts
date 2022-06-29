import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Book } from 'src/books/entities/book.entity';
import { Movie } from 'src/movies/entities/movie.entity';
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
export class Favs {
  static fromObject(object: Partial<Favs>): Favs {
    return plainToInstance<Favs, Partial<Favs>>(Favs, object);
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

  @ManyToMany(() => Movie)
  @JoinTable()
  @ApiProperty()
  movies: Array<Movie>;

  @ManyToMany(() => Book)
  @JoinTable()
  @ApiProperty()
  books: Array<Book>;

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
