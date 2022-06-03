import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsInt,
  Min,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { MovieGenre } from '../types/movie-genre.enum';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly name: string;

  @ApiProperty()
  @IsNumber({})
  @IsInt()
  @Min(0)
  readonly year: number;

  @ApiProperty()
  @IsNumber({})
  @IsInt()
  @Min(0)
  readonly duration: number;

  @ApiProperty()
  @IsEnum(MovieGenre)
  @IsNotEmpty()
  genre: MovieGenre;
}
