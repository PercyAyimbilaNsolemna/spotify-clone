import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users-entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid';
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
    createUserDTO.apiKey = uuid4();
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

  //Method that finds a user based on id
  async findById(userId: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id: userId });
  }

  //Method that finds a user and updates the two factor authentication secret
  async updateSecretKey(
    userId: number,
    secretKey: string,
  ): Promise<UpdateResult> {
    return await this.usersRepository.update(
      { id: userId },
      { enable2FA: true, twoFASecret: secretKey },
    );
  }

  //Method to disable two factor authentication
  async disable2FA(userId: number): Promise<UpdateResult> {
    return await this.usersRepository.update(
      { id: userId },
      { enable2FA: false, twoFASecret: null },
    );
  }

  //Method to find a user based on api key
  async findByApiKey(apiKey: string): Promise<User> {
    return await this.usersRepository.findOneBy({ apiKey: apiKey });
  }
}
