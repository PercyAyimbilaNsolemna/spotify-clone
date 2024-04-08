import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSongDTO {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsArray()
  //This validates that each item in the array is a string
  @IsString({ each: true })
  readonly artists: string[];

  @IsOptional()
  @IsDateString()
  readonly releasedDate: Date;

  @IsOptional()
  @IsMilitaryTime()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
