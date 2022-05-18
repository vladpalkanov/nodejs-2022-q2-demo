import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateUserDto } from '../dto/create-user.dto';
import * as crypto from 'crypto';

export class User {
  static fromDto(dto: CreateUserDto): User {
    const user = new User();

    user.id = generateUniqueUuid();
    user.login = dto.login;
    user.password = dto.password;

    return user;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  password: string;
}

function generateUniqueUuid(): string {
  return crypto.randomBytes(4).toString('hex');
}
