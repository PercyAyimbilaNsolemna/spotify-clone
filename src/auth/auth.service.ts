import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { PayloadType } from './types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly artistsService: ArtistsService,
    private readonly jwtService: JwtService,
  ) {}

  //Method for signing in to an account
  async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne(loginDTO);

    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (passwordMatched) {
      delete user.password;
      //Extracts the payload to use to generate the JWT webn Token
      const payload: PayloadType = { email: user.email, userId: user.id };

      //Checks whether the user is an artist or not
      const artist = await this.artistsService.findArtist(payload.userId);

      //If the user is an artist it adds the artist Id to the access token
      if (artist) {
        payload.artistId = artist.id;
        console.log('The code ended here!');
      }

      //Creates the access token and returns it
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Password Does NOT Match');
    }
  }
}
