import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoginController } from './login.controller';
import { ClentServe } from "../serve/client.serve";
import { RoleMiddleware } from '../middleware/role.middleware'
@Module({
  controllers: [LoginController],
  providers: [ClentServe]
})
export class LoginModule {
  // configure(consumer: MiddlewareConsumer): void {
  //   consumer
  //     .apply(RoleMiddleware)
  //     .forRoutes(LoginController);
  // }
}
