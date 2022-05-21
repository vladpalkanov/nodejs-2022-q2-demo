import { ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToInstance } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column()
  @ApiProperty()
  singer: string;

  @Column({ type: 'simple-json' })
  @ApiProperty({
    type: String,
    isArray: true,
  })
  albums: Array<string>;

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
