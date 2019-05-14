import { Module } from '@nestjs/common';
import { HeroController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../common/schemas/user.schema';
import { CompanySchema } from '../../../common/schemas/company.schema';
import { ChatSchema } from '../../../common/schemas/chat.schame';
import { UserRoomSchema } from '../../../common/schemas/userRoom.schema';
import { UserServe } from '../serve/user.serve'

@Module({
  controllers: [HeroController],
  providers: [UserServe],
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'company', schema: CompanySchema },
    { name: 'Chat', schema: ChatSchema },
    { name: 'UserRoom', schema: UserRoomSchema }
  ])],
})
export class HeroModule { }
