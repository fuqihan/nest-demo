import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorySchema } from '../../../common/schemas/history.schema';
import { ClentServe } from "../../../core/src/serve/client.serve";
import { HistoryServe } from '../serve/history.serve';
@Module({
  controllers: [HistoryController],
  imports: [MongooseModule.forFeature([{ name: 'History', schema: HistorySchema }])],
  providers: [ClentServe, HistoryServe]
})
export class HeroModule {}
