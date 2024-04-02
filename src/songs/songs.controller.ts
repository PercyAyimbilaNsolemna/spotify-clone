import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { SongsService } from './songs.service';

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
    return 'Find A Song';
  }

  //Post method to upload a song
  @Post()
  createSong(song): string[] {
    return this.songsService.createSong(song);
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
