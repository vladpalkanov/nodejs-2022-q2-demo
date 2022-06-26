import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly name: string;

  @ApiProperty()
  @IsBoolean()
  readonly grammy: boolean;
}
