import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  private readonly songs = [];

  createSong(song): string[] {
    this.songs.push(song);
    return this.songs;
  }

  findAllSongs(): string[] {
    throw new Error(
      'There was an error whiles fetching record from the database',
    );
    return this.songs;
  }
}
