import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstatnts } from './constants';

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
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
