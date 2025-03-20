import { AuthGuard, CommonModule } from '@app/common';
import { PrismaModule } from '@app/prisma';
import { RedisModule } from '@app/redis';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    RedisModule,
    PrismaModule,
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        return {
          secret: 'jwt-secret',
          signOptions: {
            expiresIn: '30m', // 默认 30 分钟
          },
        };
      },
    }),
    CommonModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class UserModule {}
