import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Song } from './Entities/songs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDTO } from './dto/create-song-dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private songsRepository: Repository<Song>,
  ) {}

  async createSong(createSongDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = createSongDTO.title;
    song.artist = createSongDTO.artists;
    song.releaseDate = createSongDTO.releaseDate;
    song.duration = createSongDTO.duration;
    song.lyrics = createSongDTO.lyrics;

    return await this.songsRepository.save(song);
  }

  findAllSongs(): string {
    // throw new Error(
    //   'There was an error whiles fetching record from the database',
    // );
    return 'Working on it';
  }
}
