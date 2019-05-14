import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from '../../../common/schemas/company.schema';
import { ClentServe } from "../../../core/src/serve/client.serve";
@Module({
  controllers: [CompanyController],
  imports: [MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }])],
  providers: [ClentServe]
})
export class CompanyModule {}
