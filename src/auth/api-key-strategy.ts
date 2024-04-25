import { Strategy } from 'passport-http-bearer';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(apiKey: string) {
    const user = await this.authService.validateUserByApiKey(apiKey);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
