import { ApiProperty } from '@nestjs/swagger';
import {
  Exclude,
  plainToInstance,
  Transform,
  TransformFnParams,
} from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { hashPassword } from 'src/helpers/hash-password';

@Entity()
export class User {
  static fromObject(object: Partial<User>): User {
    return plainToInstance<User, Partial<User>>(User, object);
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
  @Transform(hashPasswordTransformer, { toClassOnly: true })
  password: string;

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

function hashPasswordTransformer({ value }: TransformFnParams): string {
  return hashPassword(value);
}
