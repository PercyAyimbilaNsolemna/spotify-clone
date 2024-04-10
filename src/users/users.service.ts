import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users-entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  //Methos that creates a dummy user
  async createNewUser(): Promise<User> {
    const user = new User();
    user.firstName = 'Saba';
    user.lastName = 'Ayimbila';
    user.email = 's@gmail.com';
    user.password = '123';
    return await this.usersRepository.save(user);
  }
}
