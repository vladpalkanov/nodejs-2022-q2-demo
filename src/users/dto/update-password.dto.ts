import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

const WEAK_PASSWORD_PATTERN =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export class UpdatePasswordDto {
  @ApiProperty({
    description: "The user's uuid",
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "The user's old password",
    required: true,
    pattern: WEAK_PASSWORD_PATTERN.toString(),
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(WEAK_PASSWORD_PATTERN, {
    message: 'password too weak',
  })
  oldPassword: string;

  @ApiProperty({
    description: "The user's new password",
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
