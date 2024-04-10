import { Controller, Post } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artists-entity';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  createNewArtist(): Promise<Artist> {
    return this.artistsService.createNewArtist();
  }
}
