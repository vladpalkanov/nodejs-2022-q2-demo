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
import { BookGenre } from '../types/book-genre.enum';

@Entity()
export class Book {
  static fromObject(plainObject: Partial<Book>): Book {
    return plainToInstance(Book, plainObject);
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

  @Column()
  @ApiProperty({ required: false })
  author: string;

  @Column({ type: 'varchar' }) // sqlite3 does not support enum
  @ApiProperty({ enum: BookGenre })
  genre: BookGenre;

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
