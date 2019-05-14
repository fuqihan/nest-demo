import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MainModule } from './resolvers/main.module';
import {LoginModule} from './controller/login.module';
import {UploadModule} from './controller/upload.module';
import { ClentServe } from "./serve/client.serve";
import { GraphQLConfigService } from './graphql-config.service';
import { AuthService } from './auth/auth.service';
import { EventsGateway } from './socket/socket'
@Module({
  providers: [ClentServe, AuthService, EventsGateway],
  exports: [AuthService],
  imports: [
    MainModule,
    UploadModule,
    LoginModule,
    GraphQLModule.forRootAsync({
      imports: [ApplicationModule],
      useClass: GraphQLConfigService
    }),
  ],
})
export class ApplicationModule {}
