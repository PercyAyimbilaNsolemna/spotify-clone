import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
  //Injects the songs servcice to the songs controller
  constructor(private readonly songsService: SongsService) {}
  //Get request to find all the songs
  @Get()
  findAllSongs(): string[] {
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
  findOneSong(): string {
    return 'Find A Song';
  }

  //Post method to upload a song
  @Post()
  createSong(@Body() createSongDTO: CreateSongDTO): string[] {
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
