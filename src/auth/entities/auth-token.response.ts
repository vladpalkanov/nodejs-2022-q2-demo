import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenResponse {
  @ApiProperty()
  token: string;
}
