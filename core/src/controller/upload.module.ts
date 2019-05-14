import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ClentServe } from "../serve/client.serve";
import { RoleMiddleware } from '../middleware/role.middleware';
import {BaiduServe} from '../serve/baidu.serve';
@Module({
  controllers: [UploadController],
  providers: [ClentServe,BaiduServe]
})
export class UploadModule {
  // configure(consumer: MiddlewareConsumer): void {
  //   consumer
  //     .apply(RoleMiddleware)
  //     .forRoutes(LoginController);
  // }
}
