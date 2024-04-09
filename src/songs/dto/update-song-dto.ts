import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSongDTO {
  @IsOptional()
  @IsString()
  readonly title;

  @IsOptional()
  @IsArray()
  //This validates that each item in the array is a string
  @IsNumber({}, { each: true })
  readonly artists;

  @IsOptional()
  @IsDateString()
  readonly releasedDate: Date;

  @IsOptional()
  @IsMilitaryTime()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics;
}
