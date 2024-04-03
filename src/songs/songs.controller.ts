import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
  //Injects the songs servcice to the songs controller
  constructor(private readonly songsService: SongsService) {}
  //Get request to find all the songs
  @Get()
  findAllSongs(): string[] {
    return this.songsService.findAllSongs();
  }

  //Get request to find a song
  @Get(':id')
  findOneSong(): string {
    throw new Error('I am testing the error message');
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
