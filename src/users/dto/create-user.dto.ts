import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

const WEAK_PASSWORD_PATTERN =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  login: string;

  @ApiProperty({
    required: true,
    pattern: WEAK_PASSWORD_PATTERN.toString(),
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(WEAK_PASSWORD_PATTERN, {
    message: 'password too weak',
  })
  password: string;
}
