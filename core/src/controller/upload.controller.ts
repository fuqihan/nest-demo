import {
  Get,
  OnModuleInit,
  Controller,
  Inject,
  Param,
  Body,
  Query,
  ValidationPipe,
  Post,
  UseInterceptors,
  FileInterceptor,
  UploadedFile
} from "@nestjs/common";
import { Observable, from } from "rxjs";
import { User, BackInterface } from "../../../common/interface/daka.interface";
import {
  UserService,
  HistoryService
} from "../../../common/interface/api.interface";
import { ClentServe } from "../serve/client.serve";
import { Back } from "../../../common/utils/back";
import { UserEntity } from "../../../common/domain/user";
import { Jwt } from "../../../common/utils/jwt";
import { BaiduServe } from "../serve/baidu.serve";
@Controller("api")
export class UploadController implements OnModuleInit {
  private userService: UserService;
  private HistoryService: HistoryService;
  constructor(
    @Inject(ClentServe) private readonly clentServe: ClentServe,
    @Inject(BaiduServe) private baiduServe: BaiduServe
  ) {}
  onModuleInit() {
    //   this.userService = this.clentServe.client.getService<UserService>(
    //     "UserService"
    //   );
  }
  @Post("face_ai_pre")
  @UseInterceptors(FileInterceptor("file"))
  async verifyUser(
    @UploadedFile() file,
  ) {
    try {
      let fileNames = file.originalname.split('.')[0].split('-');
      let phone = fileNames[0];
      let group = fileNames[1].charCodeAt(0).toString(16);
      let result: any = await this.baiduServe.verifyUser(
        file.buffer,
        phone,
        group
      );
      if (result.code === 0) {
        return Back.success(result.data);
      }
      return Back.error(null, result.err);
    } catch (error) {
      console.log(error);
      return Back.error(null, error);
    }
  }

  @Post("face_add_user")
  @UseInterceptors(FileInterceptor("file"))
  async addUser(
    @UploadedFile() file,
  ) {
    try {
      let fileNames = file.originalname.split('.')[0].split('-');
      let phone = fileNames[0];
      let group = fileNames[1].charCodeAt(0).toString(16);
      let result: any = await this.baiduServe.addUser(
        file.buffer,
        phone,
        group
      );
      if (result.code === 0) {
        return Back.success(null);
      }
      console.log("error");
      return Back.error(null, result.err);
    } catch (error) {
      console.log(error);
      return Back.error(null, error);
    }
  }
}
