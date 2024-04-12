import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlaylistDTO {
  @IsNotEmpty()
  @IsString()
  readonly name;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs;

  @IsNumber()
  @IsNotEmpty()
  readonly user: number;
}
