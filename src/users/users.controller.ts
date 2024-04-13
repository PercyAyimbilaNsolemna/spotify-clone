import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users-entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // createNewSong(): Promise<User> {
  //   return this.usersService.createNewUser();
  // }
}
