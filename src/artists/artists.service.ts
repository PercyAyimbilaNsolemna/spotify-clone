import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artists-entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/users-entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  //Creates a dummy method to create an artist
  async createNewArtist(): Promise<Artist> {
    const artist = new Artist();
    const user = await this.usersRepository.findOneById(2);
    artist.user = user;
    return await this.artistsRepository.save(artist);
  }
}
