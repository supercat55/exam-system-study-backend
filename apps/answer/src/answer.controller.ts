import { Controller, Get, Inject } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}
  @Inject('EXAM_SERVICE')
  private readonly examClient: ClientProxy;

  @Get()
  async getHello() {
    console.log(this.examClient.send('sum', [1, 3, 5]), '111');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value = await firstValueFrom(this.examClient.send('sum', [1, 3, 5]));

    return this.answerService.getHello() + value;
  }
}
