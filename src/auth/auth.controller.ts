import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/entities/users-entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  //Post method to sign up
  @Post('signup')
  signup(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.usersService.createNewUser(createUserDTO);
  }

  //Post method to login to an account
  @Post('login')
  login(@Body() loginDTO: LoginDTO): Promise<User> {
    return this.authService.login(loginDTO);
  }
}
