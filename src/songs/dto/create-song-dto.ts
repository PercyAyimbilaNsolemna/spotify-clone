import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateSongDTO {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsArray()
  readonly artists: string[];

  @IsNotEmpty()
  @IsDateString()
  readonly releaseDate: Date;

  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: Date;
}
