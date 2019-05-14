import { Module } from "@nestjs/common";
import { CompanyModule } from "./controller/company.module";
import { MongooseModule } from "@nestjs/mongoose";
import {mongoUrl} from '../../common/config/index';
import { from } from "rxjs";
@Module({
  imports: [
    CompanyModule,
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
