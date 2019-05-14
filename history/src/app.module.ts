import { Module } from "@nestjs/common";
import { HeroModule } from "./controller/history.module";
import { MongooseModule } from "@nestjs/mongoose";
import {mongoUrl} from '../../common/config/index';
import { from } from "rxjs";
@Module({
  imports: [
    HeroModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: mongoUrl,
      }),
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
