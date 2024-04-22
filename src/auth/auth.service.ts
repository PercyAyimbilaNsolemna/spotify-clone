import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { Enable2FAType, PayloadType } from './types/types';
import * as speakeasy from 'speakeasy';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly artistsService: ArtistsService,
    private readonly jwtService: JwtService,
  ) {}

  //Method for signing in to an account
  async login(
    loginDTO: LoginDTO,
  ): Promise<
    { accessToken: string } | { validate2FA: string; message: string }
  > {
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

      //If user has enabled two factor authentication and has the secret key
      if (user.enable2FA && user.twoFASecret) {
        //Send the validate token request link
        //Send the json web token in the response
        return {
          validate2FA: 'http://localhost:3000/auth/validate-2fa',
          message:
            'Please send the one time password/token from your Google Authenticator App',
        };
      }

      //Creates the access token and returns it
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Password Does NOT Match');
    }
  }

  //Method to enable two factor authentication
  async enable2FA(userId: number): Promise<Enable2FAType> {
    const user = await this.usersService.findById(userId);

    if (user.enable2FA) {
      return { secret: user.twoFASecret };
    }

    const secret = await speakeasy.generateSecret();

    console.log(secret);

    user.twoFASecret = secret.base32;

    await this.usersService.updateSecretKey(userId, user.twoFASecret);

    return { secret: user.twoFASecret };
  }

  //Method to validate two factor authentication
  async validate2FAToken(
    userId: number,
    token: string,
  ): Promise<{ verified: boolean }> {
    try {
      const user = await this.usersService.findById(userId);

      //Verify the secret with token by calling the verify method from speakeasy
      const verified = speakeasy.totp.verify({
        secret: user.twoFASecret,
        token: token,
        encoding: 'base32',
      });

      if (verified) {
        return { verified: true };
      } else {
        return { verified: false };
      }
    } catch (err) {
      throw new UnauthorizedException('Error verifying token');
    }
  }

  //Method to disable two factor authentication
  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.usersService.disable2FA(userId);
  }
}
