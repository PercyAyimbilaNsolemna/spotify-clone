import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/users-entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  //Method for signing in to an account
  async login(loginDTO: LoginDTO): Promise<User> {
    const user = await this.usersService.findOne(loginDTO);

    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (passwordMatched) {
      delete user.password;
      return user;
    } else {
      throw new UnauthorizedException('Password Does NOT Match');
    }
  }
}
