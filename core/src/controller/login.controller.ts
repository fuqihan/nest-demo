import {
  Get,
  OnModuleInit,
  Controller,
  Inject,
  Param,
  Body,
  Query,
  ValidationPipe,
  Post
} from "@nestjs/common";
import { Observable, from } from "rxjs";
import { User, BackInterface } from "../../../common/interface/daka.interface";
import { UserService, HistoryService } from "../../../common/interface/api.interface";
import { ClentServe } from "../serve/client.serve";
import { Back } from '../../../common/utils/back';
import { UserEntity } from '../../../common/domain/user';
import { Jwt } from "../../../common/utils/jwt";
import { async } from "rxjs/internal/scheduler/async";
@Controller("user")
export class LoginController implements OnModuleInit {
  private userService: UserService;
  private HistoryService: HistoryService;
  constructor(
    @Inject(ClentServe) private readonly clentServe: ClentServe,
  ) { }
  onModuleInit() {
    this.userService = this.clentServe.client.getService<UserService>(
      "UserService"
    );
  }


  @Post("login")
  async findOne(
    @Body("phone", ValidationPipe)
    phone,
    @Body("passwd", ValidationPipe)
    passwd,
  ): Promise<BackInterface> {
    try {
      let data = await this.userService.findUser({
        phone,
        passwd
      }).toPromise();
      let user = data;
      const addr = user.company.addr[user.companyLocation];
      user.companyLocation = addr.location;
      user.companyAddr = addr.text;
      user.company = user.company.name;
      return Back.success({
        user,
        token: Jwt.createToken(user)
      });
    } catch (error) {
      console.log(error)
      return Back.error(error);
    }
  }

  @Get("add")
  async addUser(
    @Query("phone", ValidationPipe)
    phone,
    @Query("name", ValidationPipe)
    name,
  ) {
    try {
      return await this.userService.addUser({
        name,   // 姓名
        phone,   // 电话/账号
        dept: '测试专用',   // 部门
        passwd: '123456',   // 密码
        roles: [1],
        id: null,
        company: '5c6a8124cfc1c14b44024a5f',
        faceRegister: true,
        companyLocation: 0,
        permission: {
          entryPage: true,  // 管理页面权限
          setLocation: true,  // 变更地址权限
          exportXlsx: true, // 到处表格权限
          addUser: true,  // 添加用户权限
          editUser: true,  // 修改用户权限
          locationManage: true,  // 位置管理
          checkAttendance: true,  // 检查出勤
          setPermission: true,  // 设置权限
        },
      }).toPromise();
    } catch (error) {
      return Back.error('', '账号已注册');
    }
  }
}
