import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsInt,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly name: string;

  @ApiProperty()
  @IsNumber({})
  @IsInt()
  @Min(0)
  readonly duration: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly artistId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly albumId: string;
}
