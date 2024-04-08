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

  //Method to create a new song
  async createSong(createSongDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = createSongDTO.title;
    song.artist = createSongDTO.artists;
    song.releaseDate = createSongDTO.releaseDate;
    song.duration = createSongDTO.duration;
    song.lyrics = createSongDTO.lyrics;

    return await this.songsRepository.save(song);
  }

  //Method to find all songs
  async findAllSongs(): Promise<Song[]> {
    // throw new Error(
    //   'There was an error whiles fetching record from the database',
    // );
    return await this.songsRepository.find();
  }

  //Method to find a song based on id
  async findOneSong(id: number): Promise<Song> {
    return await this.songsRepository.findOneBy({ id });
  }
}
