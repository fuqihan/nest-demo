import { Controller, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { GrpcMethod } from "@nestjs/microservices";
import { User } from "../../../common/interface/daka.interface";
import { Back } from "../../../common/utils/back";
import { UserServe } from '../serve/user.serve';
import { async } from "rxjs/internal/scheduler/async";

@Controller()
export class HeroController {
  constructor(
    @InjectModel("User") private readonly userModel: Model<any>,
    @Inject(UserServe) private userServe: UserServe
  ) { }

  @GrpcMethod("UserService")
  async addUser(user: User): Promise<any> {
    try {
      const createUser = new this.userModel(user);
      await createUser.save();
      return Back.success(''); 
    } catch (error) {
      return Back.error('')
    }
  }

  @GrpcMethod("UserService")
  async findOneByPhone(data: any) {
    try {
      let user = await this.userModel.findOne({ phone: data.phone }).populate('company').exec();
      return user;
    } catch (error) {
      return error;
    }
  }

  @GrpcMethod("UserService")
  async findUser(data: any): Promise<any> {
    try {
      let user = await this.userModel.findOne({ phone: data.phone }).populate('company').exec();
      if (user.passwd !== data.passwd) return Back.error('密码错误');
      return user;
    } catch (error) {
      return Back.error(error);
    }
  }

  @GrpcMethod("UserService")
  async joinRoom(data: any) {
    try {
      await this.userServe.joinRoom(data.userId, data.room);
      return Back.success('');
    } catch (error) {
      console.log(error)
      return Back.error(error);
    }
  }

  @GrpcMethod("UserService")
  async sendMessage(data: any) {
    try {
      console.log(data)
      await this.userServe.sendMessage(data.room, data.type, data.userId, data.text);
      return Back.success('');
    } catch (error) {
      return Back.error(error);
    }
  }

}
