import { Injectable, OnModuleInit, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ClentServe } from "../../../core/src/serve/client.serve";
import { UserService } from "../../../common/interface/api.interface";
import * as _ from 'lodash';
@Injectable()
export class UserServe implements OnModuleInit {
  constructor(
    @InjectModel("User") private readonly userModel: Model<any>,
    @InjectModel("Chat") private readonly chatModel: Model<any>,
    @InjectModel("UserRoom") private readonly roomModel: Model<any>,
  ) { }

  onModuleInit() {

  }


  async joinRoom(userId: String, room: String) {
    try {
      const rooms: any = await this.roomModel.findOne({ userId }).exec();
      if (rooms) {
        let index = _.findIndex(rooms.rooms, { name: room });
        if (index === -1) {
          await this.roomModel.update({ userId }, {
            $push: {
              rooms: {
                name: room
              }
            }
          },
            { multi: true })
        }
      } else {
        await this.roomModel.create({
          userId,
          rooms: [{
            name: room
          }]
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async sendMessage(room: String,
    type: Number,
    userId: String,
    text: String) {
    let chat = await this.chatModel.findOne({ name: room }).exec();
    if (chat) {
      await this.chatModel.update({
        name: room
      }, {
          $push: {
            chats: {
              from: userId,
              text,
            }
          }
        }, { multi: true });
    } else {
      await this.chatModel.create({
        name: room,
        type,
        chats: [{
          from: userId,
          text
        }]
      })
    }
  }


}
