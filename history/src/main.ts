import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { grpcClientOptions } from './grpc.options';
import { grpcServe } from '../../common/config/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(grpcClientOptions);
  await app.startAllMicroservicesAsync();
  app.listen(grpcServe.history.port);
}
bootstrap();
