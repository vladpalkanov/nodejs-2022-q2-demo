import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
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
