import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('songs')
export class SongsController {
  //Get request to find all the songs
  @Get()
  findAllSonngs(): string {
    return 'Find All Songs ';
  }

  //Get request to find a song
  @Get(':id')
  findOneSong(): string {
    return 'Find A Song';
  }

  //Post method to upload a song
  @Post()
  createSong(): string {
    return 'Create A Strong';
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
