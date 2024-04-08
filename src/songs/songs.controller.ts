import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';
import { Song } from './Entities/songs.entity';

@Controller('songs')
export class SongsController {
  //Injects the songs servcice to the songs controller
  constructor(
    private readonly songsService: SongsService,
    @Inject('CONNECTION') private connection: Connection,
  ) {
    console.log(
      `The connection string is ${this.connection.CONNECTION_STRING}`,
    );
  }
  //Get request to find all the songs
  @Get()
  findAllSongs(): string {
    try {
      return this.songsService.findAllSongs();
    } catch (e) {
      throw new HttpException(
        'Server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }

  //Get request to find a song
  @Get(':id')
  findOneSong(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): string {
    //console.log(`The data type of the id is ${typeof id}`);
    return `Fetch song based on id ${typeof id}`;
  }

  //Post method to upload a song
  @Post()
  createSong(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
    return this.songsService.createSong(createSongDTO);
  }

  //Patch method to update a song
  @Patch(':id')
  updateSong(): string {
    return 'Update A song';
  }

  //Delete method to delete song
  @Delete(':id')
  deleteSong(): string {
    return 'Delete Song';
  }
}
