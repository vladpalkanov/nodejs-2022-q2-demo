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
import { BookGenre } from '../types/book-genre.enum';

export class CreateBookDto {
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
  @MinLength(4)
  @MaxLength(20)
  readonly author: string;

  @ApiProperty()
  @IsEnum(BookGenre)
  @IsNotEmpty()
  readonly genre: BookGenre;
}
