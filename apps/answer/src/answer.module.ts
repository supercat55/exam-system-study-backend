import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';

@Module({
  imports: [],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
