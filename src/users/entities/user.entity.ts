import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  static fromDto(dto: CreateUserDto): User {
    const user = new User();

    user.login = dto.login;
    user.password = dto.password;

    return user;
  }

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  login: string;

  @Column()
  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  password: string;

  @CreateDateColumn()
  @Exclude({ toPlainOnly: true })
  createdAt: string;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  updtedAt: string;

  @VersionColumn()
  @Exclude({ toPlainOnly: true })
  version: number;
}
