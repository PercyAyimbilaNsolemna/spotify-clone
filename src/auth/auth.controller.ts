import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/entities/users-entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login-dto';
import { AuthService } from './auth.service';
import { Enable2FAType } from './types/types';
import { JwtAuthGuard } from './jwt-auth-guard';
import { ValidateTokenDTO } from './dto/validate-token-dto';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

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
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  //Get route to enable two factor authentication
  @Get('enable-2fa')
  @UseGuards(JwtAuthGuard)
  enable2fa(@Request() req): Promise<Enable2FAType> {
    console.log(req.user);
    return this.authService.enable2FA(req.user.userId);
  }

  //Post route to validate two factor authetication
  @Post('validate-2fa')
  @UseGuards(JwtAuthGuard)
  validate2fa(
    @Request() req,
    @Body() validateTokenDTO: ValidateTokenDTO,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(
      req.user.userId,
      validateTokenDTO.token,
    );
  }

  //Get route to disable two factor authentication
  @Get('disable-2fa')
  @UseGuards(JwtAuthGuard)
  disable2FA(@Request() req): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.userId);
  }

  //Get request to retrieve the profile of the user
  @Get('profile')
  @UseGuards(AuthGuard('bearer'))
  getProfile(@Request() req) {
    delete req.user.password;
    return {
      msg: 'Authenticated with api token',
      user: req.user,
    };
  }
}
