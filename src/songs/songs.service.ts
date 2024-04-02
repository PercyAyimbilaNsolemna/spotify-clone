import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  private readonly songs = [];

  createSong(song): string[] {
    this.songs.push(song);
    return this.songs;
  }

  findAllSongs(): string[] {
    return this.songs;
  }
}
