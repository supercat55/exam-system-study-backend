import { Controller, Get, Inject } from '@nestjs/common';
import { ExamService } from './exam.service';
import { MessagePattern } from '@nestjs/microservices';
import { RedisService } from '@app/redis';

@Controller()
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Inject(RedisService)
  redisService: RedisService;

  @Get()
  async getHello() {
    const keys = await this.redisService.keys('*');
    return this.examService.getHello() + keys;
  }

  @MessagePattern('sum')
  sum(data: number[]): number {
    return data.reduce((a, b) => a + b, 0);
  }
}
