import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlists-entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/users-entity';
import { Song } from 'src/songs/entities/songs.entity';
import { CreatePlaylistDTO } from './dto/create-playlist-dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistsRepository: Repository<Playlist>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Song)
    private readonly songsRepository: Repository<Song>,
  ) {}

  //Dummy method to create a playlist
  async createPlaylist(
    createPlaylistDTO: CreatePlaylistDTO,
  ): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = createPlaylistDTO.name;

    //Finds all the songs providec in the create Playlist DTO
    const songs = await this.songsRepository.findByIds(createPlaylistDTO.songs);
    console.log(songs);

    //Assings the songs found to the songs in the playlist entity
    playlist.songs = songs;

    //Fionds the user from the users repository and assigns it to the user in the playlist entity
    //Will be removed after implementing authentication
    const user = await this.usersRepository.findOneById(createPlaylistDTO.user);

    //Assigns the user to the user entity in the playlist entity
    playlist.user = user;

    //Creates the playlist
    return await this.playlistsRepository.save(playlist);
  }
}
