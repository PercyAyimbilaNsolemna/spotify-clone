import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDTO } from './dto/create-playlist-dto';
import { Playlist } from './entities/playlists-entity';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistService: PlaylistsService) {}

  @Post()
  createPlaylist(
    @Body() createPlaylistDTO: CreatePlaylistDTO,
  ): Promise<Playlist> {
    return this.playlistService.createPlaylist(createPlaylistDTO);
  }
}
