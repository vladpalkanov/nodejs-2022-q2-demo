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
  ArrayNotEmpty,
} from 'class-validator';

export class CreateTrackDto {
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
  readonly duration: number;

  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @ArrayNotEmpty()
  readonly albums: Array<string>;
}
