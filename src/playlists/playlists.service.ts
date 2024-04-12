import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlists-entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/users-entity';
import { Song } from 'src/songs/entities/songs.entity';

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
}
