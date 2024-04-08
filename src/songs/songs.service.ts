import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './Entities/songs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDTO } from './dto/update-song-dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private songsRepository: Repository<Song>,
  ) {}

  //Method to create a new song
  async createSong(createSongDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = createSongDTO.title;
    song.artists = createSongDTO.artists;
    song.releasedDate = createSongDTO.releasedDate;
    song.duration = createSongDTO.duration;
    song.lyrics = createSongDTO.lyrics;

    return await this.songsRepository.save(song);
  }

  //Pagination
  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const querybuilder = this.songsRepository.createQueryBuilder('c');
    querybuilder.orderBy('c.releasedDate', 'DESC');
    return paginate<Song>(querybuilder, options);
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

  //Method to delete a song based on id
  async removeSong(id: number): Promise<DeleteResult> {
    return await this.songsRepository.delete(id);
  }

  //Method to update song
  async updateSong(
    id: number,
    updateSongDTO: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return await this.songsRepository.update(id, updateSongDTO);
  }
}
