import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ExamModule } from './exam.module';

async function bootstrap() {
  const app = await NestFactory.create(ExamModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 8888,
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
