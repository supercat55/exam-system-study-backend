import { RedisService } from '@app/redis';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { RegisterUserDto } from '../dto/register-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { RequireLogin } from '@app/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(RedisService)
  redisService: RedisService;

  @Post('register')
  async register(@Body() data: RegisterUserDto) {
    return this.userService.register(data);
  }

  @Get('register-captcha')
  async registerCaptcha(@Query('email') email: string) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(`captcha_${email}`, code, 5 * 60);
  }

  @Post('login')
  async userLogin(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

  @Get('aaa')
  @RequireLogin()
  aaa() {
    return 'aaa';
  }

  @Get('bbb')
  bbb() {
    return 'bbb';
  }
}
