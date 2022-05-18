import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiProperty({
    description: "The user's login",
  })
  username: string;

  @ApiProperty({
    description: "The user's password",
  })
  password: string;
}
