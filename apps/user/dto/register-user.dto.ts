import { IsEmail, IsNotEmpty } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { LoginUserDto } from './login-user.dto';

export class RegisterUserDto extends PickType(LoginUserDto, [
  'username',
  'password',
]) {
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @IsEmail(
    {},
    {
      message: '不是合法的邮箱格式',
    },
  )
  email: string;

  @IsNotEmpty({
    message: '验证码不能为空',
  })
  captcha: string;
}
