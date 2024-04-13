import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users-entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/auth/dto/login-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  //Methos that creates a dummy user
  async createNewUser(createUserDTO: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt();
    createUserDTO.password = await bcrypt.hash(createUserDTO.password, salt);
    const user = await this.usersRepository.save(createUserDTO);
    //Deletes the password field from the response
    delete user.password;
    return user;
  }

  //Method that finds a user based on email
  async findOne(loginDTO: LoginDTO): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      email: loginDTO.email,
    });

    if (!user) {
      throw new UnauthorizedException('Could Not Find User');
    }

    console.log(user);
    return user;
  }
}
