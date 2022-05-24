import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsArray,
  IsInt,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly name: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly singer: string;

  @ApiProperty()
  @IsNumber({})
  @IsInt()
  @Min(0)
  readonly year: number;

  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  readonly trackIds: Array<string>;
}
