import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstatnts } from './constants';
import { PayloadType } from './types/types';

export class JwtStrategy extends PassportStrategy(Strategy) {
  //Runs first when a protected is accessed
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstatnts.secret,
    });
  }

  //The validate method will be called anytime request is made to a protected route
  async validate(payload: PayloadType) {
    return {
      userId: payload.userId,
      email: payload.email,
      artistId: payload.artistId,
    };
  }
}
